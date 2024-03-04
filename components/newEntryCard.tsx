'use client';

import { createNewEntry } from '@/utils/api';
import { useRouter } from 'next/navigation';

export default function NewEntryCard() {
  const router = useRouter();
  const handleOnClick = async () => {
    const data = await createNewEntry();
    router.push(`/journal/${data.id}`);
  };
  return (
    <div
      className="cursor-pointer overflow-hidden rounded-lg bg-blue-400 shadow w-1/3 flex items-center justify-center"
      onClick={handleOnClick}
    >
      <h1 className="text-xl font-semibold">Create New Entry</h1>
    </div>
  );
}
