// src/components/Auth/page.tsx
"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface AuthProps {
  onAuthSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      onAuthSuccess();
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className='w-full px-[5vw] flex flex-col items-center justify-center h-screen'>
      <form onSubmit={handleSubmit} className='bg-primary p-4 shadow-md rounded'>
        <h2 className='mb-2 text-white'>Enter Password</h2>
        <input
          type='password'
          value={password}
          onChange={handlePasswordChange}
          className='border p-2 mb-4 mr-2 bg-primary-foreground rounded-sm text-black'
          placeholder='Password'
        />
        {error && <p className='text-destructive'>{error}</p>}
        <button type='submit' className='bg-secondary text-white py-2 px-4 rounded-sm'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Auth;
