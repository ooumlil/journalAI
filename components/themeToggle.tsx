'use client';

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
    <>
      <button
        className="w-12 h-6 rounded-full bg-red-800 dark:bg-blue-700"
        onClick={() => {
          setIsDarkMode(!isDarkMode);
        }}
      ></button>
    </>
  );
}
