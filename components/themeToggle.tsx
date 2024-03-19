'use client';
import { LuMoon, LuSun } from 'react-icons/lu';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDarkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localTheme = window.localStorage.getItem('theme');
      setDarkMode(localTheme === 'dark');
    }
  }, []);

  const Toggle = () => {
    if (!isDarkMode) {
      window.localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      window.localStorage.setItem('theme', 'light');
    }
    setDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    if (localTheme) {
      if (localTheme === 'dark') document.documentElement.classList.add('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
    setDarkMode(localTheme === 'dark');
  }, []);

  return (
    <div className="absolute inset-0 z-10 left-[95%] top-[90%]">
      <div
        className="size-10 rounded-full cursor-pointer flex items-center justify-center dark:bg-slate-400/10 bg-slate-400/10"
        onClick={Toggle}
      >
        <LuMoon className="w-5 h-5 text-black block dark:hidden" />
        <LuSun className="w-5 h-5 text-yellow-300 hidden dark:block" />
      </div>
    </div>
  );
}
