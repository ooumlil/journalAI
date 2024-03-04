import NavBar from '@/components/navbar';
import ThemeToggle from '@/components/themeToggle';
import { UserButton } from '@clerk/nextjs';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`h-screen w-screen flex overflow-y-hidden`}>
      <div className="w-full h-full text-neutral-900 dark:text-gray-100 dark:bg-slate-900">
        <header className="h-[10%] border-b">
          <div className="h-full w-full flex items-center justify-around">
            <NavBar />
            <ThemeToggle />
            <UserButton />
          </div>
        </header>
        <main className="h-[90%]">{children}</main>
      </div>
    </div>
  );
}
