// src/app/providers.tsx
"use client";

import React from 'react';
import { AuthProvider } from '@/context/authContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
