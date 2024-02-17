import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { ReactNode } from 'react';

const links = [
  { href: '/', name: 'Home' },
  { href: '/journal', name: 'Journal' },
  { href: '/history', name: 'History' },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen flex">
      <aside className="w-1/4 border-r">
        <div>Mood</div>
        <ul>
          {links.map((link) => (
            <li className='p-4 text-xl' key={link.name}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="w-3/4">
        <header className="h-[10%] border-b">
          <div className="h-full w-full flex items-center justify-end px-6">
            <UserButton />
          </div>
        </header>
        <main className="h-full">{children}</main>
      </div>
    </div>
  );
}
