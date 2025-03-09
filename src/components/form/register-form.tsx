'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface RegisterFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  handleSubmit,
  loading,
}) => {
  const router = useRouter(); // Router untuk navigasi

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form 
        onSubmit={handleSubmit} 
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md"
        autoComplete="off"
      >
        <h2 className="text-white text-2xl font-bold text-center mb-6">Sign Up</h2>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Email</label>
          <input
            type="email"
            className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
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
            autoComplete="off"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Confirm Password</label>
          <input
            type="password"
            className="w-full p-3 rounded bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded focus:outline-none"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        {/* Tombol Sudah Punya Akun */}
        <div className="text-center mt-4">
          <p className="text-gray-400">Already have an account?</p>
          <button
            type="button"
            onClick={() => router.push('/login')} // Navigasi ke halaman login
            className="mt-2 inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-all"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
