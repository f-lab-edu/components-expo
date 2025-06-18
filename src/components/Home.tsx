import SearchBar from '@/components/searchbar/SearchBar';

import Carousel from '@/components/carousel/Carousel';
import { searchbarElements } from '@/components/searchbar/mocks/searchbar';
import { useGetLodgingList } from '@/components/lodging/hooks/useGetLodgingList';
import type { LodgingProps } from '@/components/lodging/types/lodging';
import Lodging from '@/components/lodging/Lodging';
import { useEffect, useRef, useState } from 'react';
import SkeletonLodging from '@/components/lodging/SkeletonLodging';
import { LODGING_WIDTH } from '@/components/lodging/constants/constant';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [skeletonCount, setSkeletonCount] = useState(0);
  const { lodging, error, isLoading } = useGetLodgingList<LodgingProps>();

  useEffect(() => {
    if (!containerRef.current) return;

    const count = Math.floor(containerRef.current.offsetWidth / LODGING_WIDTH);
    setSkeletonCount(count);
  }, []);

  if (error) return <>Something Error happen</>;

  return (
    <main className="w-full h-full flex flex-col justify-center items-center space-y-32">
      <SearchBar elements={searchbarElements} />

      <div className="w-[1400px]" ref={containerRef}>
        <Carousel>
          {isLoading
            ? Array.from({ length: skeletonCount }).map(() => <SkeletonLodging />)
            : lodging.map((el) => {
                return (
                  <li key={el.id}>
                    <Lodging {...el} />
                  </li>
                );
              })}
        </Carousel>
      </div>
    </main>
  );
}
