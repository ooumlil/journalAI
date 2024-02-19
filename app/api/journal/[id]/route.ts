import { analyse } from '@/utils/ai';
import { getUserByClerkId } from '@/utils/auth';
import { prisma } from '@/utils/db';
import { Analyse } from '@/utils/types';
import { NextResponse } from 'next/server';

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const user = await getUserByClerkId();
  const { content } = await req.json();
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
    },
  });
  const analysis: Analyse | null = await analyse(updatedEntry.content);
  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      userId: user.id,
      entryId: updatedEntry.id,
      ...analysis!,
    },
    update: analysis!,
  });
  return NextResponse.json({
    data: { ...updatedEntry, analysis: updatedAnalysis },
  });
};
