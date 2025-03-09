'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface FormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const LoginForm: React.FC<FormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
  loading,
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-white text-2xl font-bold text-center mb-6">Sign In</h2>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Password</label>
          <input
            type="password"
            className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="flex justify-between items-center text-gray-400 text-sm mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded focus:outline-none"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        
        <p className="text-gray-400 text-center mt-4">
          Don't have an account?  
          <button 
            type="button"
            onClick={() => router.push('/register')}
            className="text-blue-500 hover:underline ml-1"
          >
            Sign Up
          </button>
        </p>
        
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-600" />
          <span className="text-gray-400 mx-2">Or With</span>
          <hr className="flex-grow border-gray-600" />
        </div>
        
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white py-2 rounded">
            Google
          </button>
          <button className="flex-1 flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white py-2 rounded">
            Apple
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
