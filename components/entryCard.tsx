export default function EntryCard({ entry }: { entry: any }) {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
      <div className="px-6 py-5">{date}</div>
      <div className="px-6 py-5">{entry.content}</div>
      {/* <div className="p-6 py-5">{entry.analysis?.summary}</div>
      <div className="px-4 py-4">{entry.analysis?.mood}</div> */}
    </div>
  );
}
