import { analyse } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content:
        'i enjoyed this day so far, i got invited to a friend gathering celebrating my friend landing a job we had fun and ate some decent food.',
    },
  });
  const analysis: any = await analyse(entry.content);
  await prisma.analysis.create({
    data: { entryId: entry.id, ...analysis },
  });
  revalidatePath('/journal');
  return NextResponse.json({ data: entry });
};
