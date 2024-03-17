import { JournalEntry } from '@/utils/types';

export default function EntryCard({ entry }: { entry: JournalEntry }) {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <div
      className="divide-y divide-gray-200 overflow-hidden rounded-lg shadow bg-opacity-10 bg-blue-400 dark:bg-[#084494]"
    >
      <div className="px-6 py-5 flex justify-between">
        <div className="">{date}</div>
        <div className="">{entry.analysis?.emoji}</div>
      </div>
      <div className="p-6 py-5">{entry.analysis?.summary}</div>
      <div className="px-4 py-4">{entry.analysis?.mood}</div>
    </div>
  );
}
