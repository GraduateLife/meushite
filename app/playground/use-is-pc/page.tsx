'use client';
import useIsPC from '@/hooks/useIsPC';
import React from 'react';

const Page = () => {
  const isPC = useIsPC();
  return (
    <div>
      <h1>useIsPC hook test</h1>
      {isPC ? <p>You are on a PC</p> : <p>You are on a mobile</p>}
    </div>
  );
};

export default Page;
