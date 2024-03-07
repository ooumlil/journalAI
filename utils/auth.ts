import { auth } from '@clerk/nextjs';
import { prisma } from './db';
import { User } from './types';

export const getUserByClerkId = async () => {
  const { userId } = auth();
  const user = await prisma.user.findUnique({
    where: { clerkId: userId as string },
  });
  return user as User;
};
