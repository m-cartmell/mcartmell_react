import { useContext } from 'react';
import { WorkContext } from '@/Components/Context';

const useWorkContext = () => {
  const context = useContext(WorkContext);

  if (!context) {
    throw new Error('useWorkContext must be used inside Provider');
  }

  return context;
};

export default useWorkContext;
