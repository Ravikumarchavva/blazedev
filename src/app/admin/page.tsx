"use client";
import Auth from '@/components/Auth/page';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

const Admin: React.FC = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const handleAuthSuccess = () => {
    setAuthenticated(true);
  };

  if (!authenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className='w-full px-[5vw] pt-20'>
      <h1>Admin Page</h1>
      <Button className='bg-secondary hover:text-black hover:bg-white py-2 px-4 rounded'>
        Add Project
      </Button>
      <Button className='bg-secondary hover:text-black hover:bg-white py-2 px-4 rounded ml-4'>
        Add Blog
      </Button>
    </div>
  );
};

export default Admin;
