import { prisma } from '@/utils/db';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const createNewUser = async () => {
  const user = await currentUser();
  const match = await prisma.user.findUnique({
    where: { clerkId: user?.id as string },
  });
  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress!,
      },
    });
  }
  return true;
};

export default async function NewUser() {
  const ret = await createNewUser();
  ret ? redirect('/(dashboard)/journal') : null;
  return <>...loading</>;
}
