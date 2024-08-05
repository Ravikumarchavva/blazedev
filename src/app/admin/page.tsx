// src/app/admin/page.tsx
"use client";

import React, { useState } from 'react';
import Auth from '@/components/Auth/page';
import ProtectedRoute from '@/components/ProtectedRoute/page';
import { useAuth } from '@/context/authContext';
import Link from 'next/link';

const Admin: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const [authenticated, setAuthenticated] = useState<boolean>(isAuthenticated);

  const handleAuthSuccess = () => {
    login();
    setAuthenticated(true);
  };

  if (!authenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <ProtectedRoute>
      <div className='w-full px-[5vw] pt-20 flex items-center justify-center min-h-screen'>
        <button className='bg-secondary text-white hover:text-black hover:bg-white py-2 px-4 rounded'>
          <Link href={'./AddProject'}>
            Add Project
          </Link>
        </button>
        <button className='bg-secondary text-white hover:text-black hover:bg-white py-2 px-4 rounded ml-4'>
          <Link href={'./AddBlog'}>Add Blog</Link>
        </button>
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
