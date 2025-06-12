import { useSearchBar } from '@/components/searchbar/hooks/useSearchBar';
import React, {
  isValidElement,
  type Dispatch,
  type ReactElement,
  type SetStateAction,
} from 'react';

type SearchBarProps = {
  children: React.ReactNode;
};

type SearchBarElementProps = {
  index?: number;
  isFirstChild: boolean;
  isActiveMenu: boolean;
  setActiveMenu: Dispatch<SetStateAction<number>>;
};

const gridClass = (count: number) => {
  switch (count) {
    case 1:
      return 'grid-cols-1';
    case 2:
      return 'grid-cols-2';
    case 3:
      return 'grid-cols-3';
    case 4:
      return 'grid-cols-4';
    default:
      return '';
  }
};

export default function SearchBar({ children }: SearchBarProps) {
  const childrenCount = React.Children.count(children);
  const { activeMenu, setActiveMenu } = useSearchBar();

  return (
    <div
      className={`w-[60%] grid gap-2 ${gridClass(
        childrenCount
      )} box-border border border-gray-300 shadow-lg rounded-4xl overflow-hidden ${
        activeMenu !== -1 ? 'bg-[#ebebeb]' : ''
      }`}
    >
      {React.Children.map(children, (child, idx) => {
        if (isValidElement(child)) {
          return React.cloneElement(child as ReactElement<SearchBarElementProps>, {
            index: idx,
            isFirstChild: idx === 0,
            isActiveMenu: activeMenu === idx,
            setActiveMenu,
          });
        }
        return child;
      })}
    </div>
  );
}
