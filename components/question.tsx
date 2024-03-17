'use client';

import { askQuestion } from '@utils/api';
import { useEffect, useState } from 'react';
import Modal from '@components/modal';
import Spinner from '@components/spinner';

export default function Question() {
  const [value, setValue] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  useEffect(() => {
    if (response) {
      setModalOpen(true);
    }
  }, [response]);

  const closeModal = () => {
    setModalOpen(false);
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
          className="border border-black/20 p-3 text-lg dark:bg-[#3b3b3b] dark:text-slate-100 rounded-lg focus:outline-none"
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-400 hover:bg-blue-500 p-3 rounded-lg text-lg text-white dark:bg-blue-600 hover:dark:bg-[#084494]"
        >
          ask
        </button>
        {loading && <Spinner />}
        {response && (
          <div>
            {modalOpen && <Modal onClose={closeModal}>{response}</Modal>}
          </div>
        )}
      </form>
    </>
  );
}
