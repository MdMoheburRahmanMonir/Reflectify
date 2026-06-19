'use client';

import { useEffect, useState } from 'react';
import { FaCloudMoon, FaRegMoon } from 'react-icons/fa';
import { IoIosPartlySunny, IoIosSunny } from 'react-icons/io';

export default function ThemeToggle() {
  const [mode, setMode] = useState('system');

  useEffect(() => {
    const saved = localStorage.getItem('theme-mode');
    if (saved) {
      setMode(saved);
      applyMode(saved);
    } else {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  function applyMode(value) {
    const root = document.documentElement;
    if (value === 'dark') {
      root.classList.add('dark');
    } else if (value === 'light') {
      root.classList.remove('dark');
    } else {
      // system
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      prefersDark ? root.classList.add('dark') : root.classList.remove('dark');
    }
  }

  function toggle() {
    const next = mode === 'dark' ? 'light' : 'dark';
    setMode(next);
    localStorage.setItem('theme-mode', next);
    applyMode(next);
  }

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className="inline-flex items-center justify-center rounded-full p-2 bg-slate-100 dark:bg-slate-800 text-sm"
    >
      {mode === 'dark' ? (
        <IoIosSunny />
      ) : (
        <FaRegMoon />
      )}
    </button>
  );
}
