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
  console.log('entries', entries);
  return <div>hh</div>;
}
