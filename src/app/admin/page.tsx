// src/app/admin/page.tsx
// "use client";

import React from 'react';
import Link from 'next/link';

const Admin: React.FC = () => {


  return (
      <div className='w-full px-[5vw] pt-20 flex items-center justify-center min-h-screen'>
        <button className='bg-secondary text-white hover:text-black hover:bg-white py-2 px-4 rounded'>
          <Link href={'./admin/addproject'}>
            Add Project
          </Link>
        </button>
        <button className='bg-secondary text-white hover:text-black hover:bg-white py-2 px-4 rounded ml-4'>
          <Link href={'./admin/addblog'}>Add Blog</Link>
        </button>
      </div>
  );
};

export default Admin;
