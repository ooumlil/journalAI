import EntryCard from '@components/entryCard';
import NewEntryCard from '@components/newEntryCard';
import Question from '@components/question';
import { getUserByClerkId } from '@utils/auth';
import { prisma } from '@utils/db';
import { JournalEntry, User } from '@utils/types';
import Link from 'next/link';

const getEntries = async () => {
  const user: User = await getUserByClerkId();
  const entries = await prisma.journalEntry.findMany({
    where: { userId: user.id },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  });
  return entries as JournalEntry[];
};

export default async function Journal() {
  const entries = await getEntries();
  return (
    <div className="p-10 h-full overflow-y-auto">
      <div className="flex justify-between pb-4">
        <Question />
        <NewEntryCard />
      </div>
      <h1 className="text-xl mb-2">Journal List</h1>
      <div className="grid grid-cols-3 gap-4">
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
}
