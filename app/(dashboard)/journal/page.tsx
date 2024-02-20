import EntryCard from '@/components/entryCard';
import NewEntryCard from '@/components/newEntryCard';
import Question from '@/components/question';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { JournalEntry, User } from '@/utils/types';
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
  return entries;
};

export default async function Journal() {
  const entries: JournalEntry[] = await getEntries();
  return (
    <div className="p-10 bg-zinc-400/50 h-full overflow-y-auto">
      <span className="text-2xl mb-8">Journal</span>
      <div className=" my-8">
        <Question />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
}
