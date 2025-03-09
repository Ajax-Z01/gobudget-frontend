
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6">
      {/* Header */}
      <header className="flex justify-between items-center w-full py-4">
        <div className="flex items-center gap-2">
          <Image
            src="/gobudget-logo.svg"
            alt="GoBudget Logo"
            width={40}
            height={40}
            style={{ width: "auto", height: "40px" }}
          />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            GoBudget
          </span>
        </div>
        <nav className="hidden sm:flex gap-6">
          <a href="/features" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
            Features
          </a>
          <a href="/help" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
            Help
          </a>
          <a href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
            About
          </a>
        </nav>
        <div className="flex gap-3">
          <Link 
            href="/login" 
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hidden sm:block"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center max-w-4xl mx-auto py-12 sm:py-20">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 dark:text-white mb-6">
          Take Control of Your <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Finances</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          GoBudget helps you track expenses, set goals, and build better financial habits. Start your journey to financial freedom today.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex gap-4 flex-col sm:flex-row mb-12">
          <Link
            href="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full px-6 py-3 transition-colors"
          >
            Create Free Account
          </Link>
          <Link
            href="/features"
            className="bg-transparent border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-full px-6 py-3 transition-colors"
          >
            Learn More
          </Link>
        </div>
        
        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Expense Tracking</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Easily log and categorize your expenses to understand your spending habits.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Budgeting Tools</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Create personalized budgets and get alerts when you're approaching your limits.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Financial Insights</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get visual reports and analysis to help you make better financial decisions.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <Image
              src="/gobudget-logo.svg"
              alt="GoBudget Logo"
              width={30}
              height={30}
              style={{ width: "auto", height: "30px" }}
            />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              © 2023 GoBudget. All rights reserved.
            </span>
          </div>
          
          <div className="flex gap-6">
            <a href="/help" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
              Help
            </a>
            <a href="/privacy" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
              Privacy
            </a>
            <a href="/terms" className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
