import { prisma } from '@/utils/db';
import { currentUser } from '@clerk/nextjs';
import { redirect, useRouter } from 'next/navigation';

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
};

export default async function NewUser() {
  // const router = useRouter();
  await createNewUser();
  // router.push('/journal');
  return <>...loading</>;
}
