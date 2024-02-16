import { OpenAI, OpenAIEmbeddings } from '@langchain/openai';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import z from 'zod';
import { Document } from 'langchain/document';
import { loadQARefineChain } from 'langchain/chains';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('the mood of the person who wrote the journal entry.'),
    subject: z.string().describe('the subject of the journal entry.'),
    negative: z
      .boolean()
      .describe(
        'is the journal entry negative? (i.e. does it contain negative emotions?'
      ),
    summary: z.string().describe('quick summary of the entire entry.'),
    color: z.string().describe(
      `a hexadecimal color code that represents the mood of the entry. 
      Example: #0101fe for blue representing happiness.`
    ),
  })
);

const getPrompt = async (content: string) => {
  const formattedInstructions = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    template: `Analyse the following journal entry. Follow the instructions and format your response to match the format instructions,
     no matter what! \n{formattedInstructions}\n{entry}`,
    inputVariables: ['entry'],
    partialVariables: { formattedInstructions },
  });

  const input = await prompt.format({ entry: content });
  return input;
};

export const analyse = async (prompt: string) => {
  const input = await getPrompt(prompt);
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  const result = await model.invoke(input);
  try {
    return parser.parse(result);
  } catch (error) {
    console.log('error', error);
  }
  return result;
};

export const qa = async (question: string, entries: any) => {
  const docs = entries.map(
    (entry: any) =>
      new Document({
        pageContent: entry.content,
        metadata: { id: entry.id, createdAt: entry.createdAt },
      })
  );
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  const chain = loadQARefineChain(model);
  const embeddings = new OpenAIEmbeddings();
  const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
  const relevantDocs = await store.similaritySearch(question);
  const res = await chain.invoke({ input_documents: relevantDocs, question });
  return res.output_text;
};
