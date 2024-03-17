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
    <div className="absolute left-[50%] -top-10 ">
      <div
        className="size-10 rounded-full cursor-pointer border-black dark:border-zinc-100 border-2 flex items-center justify-center dark:bg-zinc-100 bg-black"
        onClick={Toggle}
      >
        {isDarkMode ? (
          <LuMoon className="w-5 h-5 text-black" />
        ) : (
          <LuSun className="w-5 h-5 text-zinc-100" />
        )}
      </div>
    </div>
  );
}
