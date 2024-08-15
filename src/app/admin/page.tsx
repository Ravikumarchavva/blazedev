import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import Image from 'next/image';

const Admin: React.FC = async () => {
  const users = await db.user.findMany();

  return (
    <div className='w-full px-[5vw] gap-10 pt-20 flex items-center justify-center min-h-screen'>
      <p>Number of users: {users.length}</p>
      {users.map((user) => (
        <div key={user.id}>
          {/* Render user details here */}
          <p>{user.name}</p>
          <p>{user.email}</p>
          {/* Add more user details as needed */}
        </div>
      ))}
    </div>
  );
};

export default Admin;