import { auth } from '@clerk/nextjs';
import Link from 'next/link';

export default async function Home() {
  const { userId } = await auth();
  let href = !userId ? '/new-user' : '/journal';
  return (
    <div className="w-screen h-screen bg-slate-200 dark:bg-slate-900 flex justify-center items-center text-slate-900 dark:text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">The Best Journal App</h1>
        <p className="text-2xl text-slate-900/80 dark:text-white/80 mb-4">
          This is the best app for tracking your mood throughout your life, all
          you have to do is be honest.
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-400 dark:bg-blue-800 text-slate-950 dark:text-slate-200 px-4 py-2 rounded-lg text-xl">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
