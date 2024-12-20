'use client';

import { useMedia } from 'react-use';

const useIsOnPC = () => {
  return useMedia('(min-width: 500px)');
};

export default useIsOnPC;
