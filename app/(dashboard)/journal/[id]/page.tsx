import Editor from '@/components/editor';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id: id,
      },
    },
  });
  return entry;
};

export default async function EntryPage({
  params,
}: {
  params: { id: string };
}) {
  const entry = await getEntry(params.id);
  return (
    <div className="h-full w-full">
      <Editor entry={entry} />
    </div>
  );
}
