'use client';

import { useMedia } from 'react-use';

const useIsOnPC = () => {
  return useMedia('(min-width: 420px)');
};

export default useIsOnPC;
