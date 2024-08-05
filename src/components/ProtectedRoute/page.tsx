// src/components/ProtectedRoute/page.tsx
"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import from 'next/navigation' for Next.js 13.4+
import { useAuth } from '@/context/authContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin'); // Change to your login route
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
