import NavBar from '@/components/navbar';
import ThemeToggle from '@/components/themeToggle';
import { UserButton } from '@clerk/nextjs';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`h-screen w-screen flex overflow-y-hidden`}>
      <div className="w-full h-full text-neutral-900 dark:text-gray-100 dark:bg-slate-900">
        <header className="h-[10%]">
          <div className="h-full w-full flex items-center justify-between">
            <div className="ml-6">
              <UserButton />
            </div>
            <NavBar />
          </div>
        </header>
        <main className="relative h-[90%]">
          <ThemeToggle />
          {children}
        </main>
      </div>
    </div>
  );
}
