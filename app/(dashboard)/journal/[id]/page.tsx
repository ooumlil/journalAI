import Editor from '@/components/editor';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { JournalEntry } from '@/utils/types';

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
    include: { analysis: true },
  });
  return entry as JournalEntry;
};

export default async function EntryPage({
  params,
}: {
  params: { id: string };
}) {
  const entry: JournalEntry = await getEntry(params.id);
  return (
    <div className="h-full w-full">
        <Editor entry={entry} />
    </div>
  );
}
