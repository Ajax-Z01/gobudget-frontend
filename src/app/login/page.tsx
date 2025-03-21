'use client';

import React, { useState } from 'react';
import { login } from '@/services/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-color)] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center mb-5">
          <Image 
            src="/gobudget-logo.svg" 
            alt="GoBudget Logo" 
            width={60} 
            height={60}
            style={{ width: "auto", height: "60px" }}
            className="mx-auto logo-homepage"
          />
        </Link>
        <h2 className="mt-3 text-center text-3xl font-extrabold title-name">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-[var(--foreground)]">
          Sign in to your account to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[var(--card-bg)] py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 text-[var(--tertiary)] border border-[var(--tertiary)] bg-[var(--bg-error)] rounded-md p-3 text-sm">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium title-name">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-[var(--border-color)] rounded-md shadow-sm placeholder-[var(--foreground)] focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] bg-[var(--input-bg)] text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium title-name">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-[var(--border-color)] rounded-md shadow-sm placeholder-[var(--foreground)] focus:outline-none focus:ring-[var(--primary)] focus:border-[var(--primary)] bg-[var(--input-bg)] text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-[var(--secondary-hover)] focus:ring-[var(--secondary)] border-[var(--border-color)] bg-[var(--input-bg)] rounded"
                />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-[var(--foreground)]">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-semibold text-[var(--secondary)] hover:text-[var(--secondary-hover)]">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-[var(--border-color)] rounded-md shadow-sm text-sm font-medium text-[var(--text-white)] bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--secondary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--foreground)]">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-medium text-[var(--secondary)] hover:text-[var(--secondary-hover)]">
                Sign up
              </Link>
            </p>
          </div>
          
        </div>
        <div className="flex gap-12 justify-center mt-6 text-sm text-[var(--foreground)]">
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
