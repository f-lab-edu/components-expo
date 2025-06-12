import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

type SearchBarContextProps = {
  activeMenu: number;
  setActiveMenu: Dispatch<SetStateAction<number>>;
};

export const SearchBarContext = createContext<SearchBarContextProps | null>(null);

export const SearchBarProvider = ({ children }: { children: ReactNode }) => {
  const [activeMenu, setActiveMenu] = useState<number>(-1);

  return (
    <SearchBarContext.Provider value={{ activeMenu, setActiveMenu }}>
      {children}
    </SearchBarContext.Provider>
  );
};
