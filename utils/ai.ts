import { OpenAI } from '@langchain/openai';

export const analyse = async () => {
  const model = new OpenAI({ temperature: 0, modelName: 'gpt-3.5-turbo' });
  const result = await model.invoke('hello');
  console.log('result', result);
};
