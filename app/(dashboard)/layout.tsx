import { UserButton } from '@clerk/nextjs';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen flex">
      <aside className="w-1/4 border-r">aside</aside>
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
