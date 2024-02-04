import EntryCard from '@/components/entryCard';
import NewEntryCard from '@/components/newEntryCard';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';

const getEntries = async () => {
  const user = await getUserByClerkId();
  const entries = await prisma.journalEntry.findMany({
    where: { userId: user.id },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return entries;
};

export default async function Journal() {
  const entries = await getEntries();
  return (
    <div className="p-10 bg-zinc-400/50 h-full">
      <span className="text-2xl mb-8">Journal</span>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry: any) => (
          <EntryCard entry={entry} key={entry.id} />
        ))}
      </div>
    </div>
  );
}
