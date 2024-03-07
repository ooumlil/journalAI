'use client';
import { LuMoon, LuSun } from 'react-icons/lu';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  useEffect(() => {
    const theme = localStorage.getItem('theme');
    theme === 'dark' ? setIsDarkMode(true) : null;
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  return (
    <div className="absolute left-[50%] -top-10 ">
      <div
        className="size-10 rounded-full cursor-pointer border-black dark:border-zinc-100 border-2 flex items-center justify-center dark:bg-zinc-100 bg-black"
        onClick={() => {
          setIsDarkMode(!isDarkMode);
        }}
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
