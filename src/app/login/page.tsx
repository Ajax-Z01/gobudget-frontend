'use client';

import React, { useState } from 'react';
import { login } from '@/services/auth';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/form/LoginForm';

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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="items-center justify-center min-h-screen bg-gray-900">
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        loading={loading}
      />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
};

export default LoginPage;