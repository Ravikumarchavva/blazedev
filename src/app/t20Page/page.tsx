// pages/index.tsx
import React from 'react';
import T20Matches from '@/components/T20Matches';

const HomePage: React.FC = () => {
  return (
    <div className='pt-20'>
      <h1>Welcome to the T20 Matches Page</h1>
      <T20Matches />
    </div>
  );
};

export default HomePage;
