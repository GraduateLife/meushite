'use client';

import { getObjectUrl, greet } from '@/actions/blog';
import { Button } from '@/components/ui/button';

import { useEffect, useState } from 'react';

export default function Playground() {
  const [image, setImage] = useState<string | undefined>(undefined);
  const handleImage = async () => {
    const url = await getObjectUrl('YargsCli.png');
    setImage(url);
  };
  useEffect(() => {
    handleImage();
  }, []);

  const [greeting, setGreeting] = useState<string | null>('CLICK ME ');
  const handleClick = async () => {
    const greeting = await greet();
    setGreeting(greeting);
  };
  return (
    <>
      <img src={image} />
      <Button onClick={handleClick}>{greeting}</Button>
    </>
  );
}
