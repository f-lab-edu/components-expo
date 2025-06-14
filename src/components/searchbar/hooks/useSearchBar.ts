import { SearchBarContext } from '@/components/searchbar/contexts/SearchBarContext';
import { useContext } from 'react';

export const useSearchBar = () => {
  const context = useContext(SearchBarContext);

  if (!context) {
    throw new Error('useSearchBar는 SearchBarProvider 내에서 사용되어야 합니다.`');
  }

  return context;
};
