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
    <button
      className="cursor-pointer overflow-hidden rounded-lg bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-500/90 hover:bg-blue-600/90 shadow w-1/4 flex items-center justify-center"
      onClick={handleOnClick}
    >
      <h1 className="text-xl font-medium text-zinc-100 dark:text-zinc-100">
        Create Entry
      </h1>
    </button>
  );
}
