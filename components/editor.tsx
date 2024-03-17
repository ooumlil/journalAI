'use client';

import { updateEntry } from '@/utils/api';
import { JournalEntry } from '@/utils/types';
import { useState } from 'react';
import { useAutosave } from 'react-autosave';
import Spinner from './spinner';

export default function Editor({ entry }: { entry: JournalEntry }) {
  const [value, setValue] = useState(entry.content);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis!);

  useAutosave({
    data: value,
    interval: 10000,
    onSave: async (_value) => {
      setIsLoading(true);
      const data = await updateEntry(entry.id, _value);
      setAnalysis(data?.analysis);
      setIsLoading(false);
    },
  });

  const { summary, subject, mood, negative, color, emoji } = analysis;
  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: `${negative}` },
    { name: 'Emoji', value: emoji },
  ];
  return (
    <div className="w-full h-full  grid grid-cols-3">
      <div className="col-span-2">
        {isLoading && (
          <div className="absolute flex items-center">
            <Spinner />
          </div>
        )}
        <textarea
          className="w-full h-full p-8 text-xl outline-none dark:bg-[#3b3b3b] dark:text-[#d9d6d0] text-slate-900 bg-[#f5f5f5]"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="border-l border-black/10">
        <div className="p-8" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Ai stuff</h2>
        </div>
        <div>
          <ul className="flex flex-col gap-4">
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="flex items-center justify-between p-2 gap-1"
              >
                <span className="font-semibold text-lg">{item.name}</span>
                <span>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
