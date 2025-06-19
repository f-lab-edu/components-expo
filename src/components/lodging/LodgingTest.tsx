import { useGetLodgingList } from '@/components/lodging/hooks/useGetLodgingList';
import { useInfiniteScroll } from '@/components/lodging/hooks/useInfiniteScroll';
import Lodging from '@/components/lodging/Lodging';
import type { LodgingProps } from '@/components/lodging/types/lodging';
import { useRef, useState } from 'react';

export default function LodgingTest() {
  const { lodging } = useGetLodgingList<LodgingProps>();
  const targetRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useInfiniteScroll();

  return (
    <div className="w-full h-full flex justify-center items-center bg-amber-100 overflow-hidden">
      <ul className="h-full grid grid-cols-2 gap-2 overflow-y-scroll">
        {lodging.map((el) => (
          <li key={el.id}>
            <Lodging {...el} />
          </li>
        ))}
        <div ref={targetRef}></div>
      </ul>
    </div>
  );
}
