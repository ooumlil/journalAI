'use client';

import { askQuestion } from '@/utils/api';
import { useState } from 'react';

export default function Question() {
  const [value, setValue] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const answer = await askQuestion(value);
    setResponse(answer);
    setValue('');
    setLoading(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          disabled={loading}
          onChange={onChange}
          value={value}
          type="text"
          placeholder="Ask a question"
          className="border border-black/20 p-3 text-lg  rounded-lg"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-400 p-3 rounded-lg text-lg"
        >
          ask
        </button>
        {loading && <div>...loading</div>}
        {response && <div>{response}</div>}
      </form>
    </>
  );
}
