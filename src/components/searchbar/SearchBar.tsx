import SearchBarElement from '@/components/searchbar/components/SearchBarElement';
import SearchButon from '@/components/searchbar/components/SearchButon';
import useOutsideClick from '@/components/searchbar/hooks/useOutsideClick';
import React, { useRef, useState } from 'react';

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

const searchbarElements: { title: string; content: string | React.ReactNode }[] = [
  {
    title: '여행지',
    content: <input className=" outline-none" type="text" placeholder="여행지 검색" />,
  },
  { title: '체크인', content: '날짜 추가' },
  { title: '체크아웃', content: '날짜 추가' },
  { title: '여행자', content: '게스트 추가' },
];

export default function SearchBar() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeMenu, setActiveMenu] = useState(-1);
  const isMenuActive = activeMenu !== -1;

  useOutsideClick(wrapperRef, () => setActiveMenu(-1));

  return (
    <div
      ref={wrapperRef}
      className={`w-[60%] grid gap-2 relative ${gridClass(
        searchbarElements.length
      )} box-border border border-gray-300 shadow-lg rounded-4xl overflow-hidden ${
        activeMenu !== -1 ? 'bg-[#ebebeb]' : ''
      }`}
    >
      {searchbarElements.map(({ title, content }, idx) => (
        <SearchBarElement
          key={title}
          title={title}
          content={content}
          index={idx}
          isFirstChild={idx === 0}
          isActiveMenu={idx === activeMenu}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
      ))}

      <div className="absolute z-20 top-1/2 right-3 translate-x-0.5 -translate-y-1/2 bg-[#FF385C] rounded-full flex justify-center items-center p-3">
        <SearchButon isMenuActive={isMenuActive} />
      </div>
    </div>
  );
}
