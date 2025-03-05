"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import Switch from "@/components/ui/ThemeSwitcher";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDarkMode = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  return (
    <div
      data-theme={theme}
      className={`relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] 
        ${isDarkMode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      {/* Theme Switcher */}
      <div className="absolute top-4 right-4 z-10">
        <Switch />
      </div>
      
      {/* Main Content */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start relative z-10">
        {/* Logo */}
        <Image
          className={isDarkMode ? "invert" : ""}
          src="/gobudget-logo.svg"
          alt="GoBudget logo"
          width={180}
          height={38}
          priority
        />
        
        {/* Instruction List */}
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">Get started by adding your first expense in the dashboard.</li>
          <li>Track and manage your financial records with ease.</li>
        </ol>

        {/* Navigation Buttons */}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className={`rounded-full border border-transparent transition-colors flex items-center justify-center gap-2 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 
            ${isDarkMode ? "bg-white text-black hover:bg-gray-300" : "bg-black text-white hover:bg-gray-800"}`}
            href="/dashboard"
          >
            Go to Dashboard
          </a>
          <a
            className="rounded-full border border-gray-300 dark:border-gray-600 transition-colors flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/about"
          >
            Learn More
          </a>
        </div>
      </main>

      {/* Footer Links */}
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center z-10">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/help"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Help Center
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/features"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Features
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          GoBudget Home →
        </a>
      </footer>
    </div>
  );
}
