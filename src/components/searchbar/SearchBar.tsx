import React from 'react';

type SearchBarProps = {
  children: React.ReactNode;
};

export default function SearchBar({ children }: SearchBarProps) {
  const childrenCount = React.Children.count(children);

  return (
    <div
      className={`w-[60%] grid gap-2 grid-cols-${childrenCount} px-4 py-2 box-border border border-gray-300 bg-whiite shadow-lg rounded-4xl`}
    >
      {children}
    </div>
  );
}
