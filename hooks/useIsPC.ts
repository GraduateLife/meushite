'use client';
import { useMedia } from 'react-use';
import { screens } from '../tailwind.screen';
import { useEffect, useState } from 'react';

const useMediaQuery = (queryString: string) => {
  const [isMatched, setIsMatched] = useState(true);
  useEffect(() => {
    const res = window.matchMedia(queryString);
    const handleWindowSizeChange = () => setIsMatched(res.matches);
    res.addEventListener('change', handleWindowSizeChange);
    return () => res.removeEventListener('change', handleWindowSizeChange);
  }, [queryString]);
  return isMatched;
};

const useIsPC = () => {
  return useMediaQuery(`(min-width: ${screens.sm})`);
};

export default useIsPC;
