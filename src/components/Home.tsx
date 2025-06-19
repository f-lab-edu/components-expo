import SearchBar from '@/components/searchbar/SearchBar';

import Carousel from '@/components/carousel/Carousel';
import { searchbarElements } from '@/components/searchbar/mocks/searchbar';
import { useGetLodgingList } from '@/components/lodging/hooks/useGetLodgingList';
import type { LodgingProps } from '@/components/lodging/types/lodging';
import Lodging from '@/components/lodging/Lodging';
import { useRef } from 'react';
import SkeletonLodging from '@/components/lodging/SkeletonLodging';
import { LODGING_WIDTH } from '@/components/lodging/constants/constant';
import { useSkeletonUI } from '@/components/lodging/hooks/useSkeletonUI';
import { useUpdateLodgingLike } from '@/components/lodging/hooks/useUpdateLodgingLike';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lodging, error, isLoading } = useGetLodgingList<LodgingProps>();
  const { mutate: updateLikeLodging } = useUpdateLodgingLike();
  const { skeletonCount } = useSkeletonUI({ containerRef, itemWidth: LODGING_WIDTH });

  if (error) return <>Something Error happen</>;

  return (
    <main className="w-full h-full flex flex-col justify-center items-center space-y-20 py-20">
      <SearchBar elements={searchbarElements} />

      <div className="w-[1400px] space-y-6" ref={containerRef}>
        <Carousel>
          {isLoading
            ? Array.from({ length: skeletonCount }).map(() => <SkeletonLodging />)
            : lodging.map((el) => {
                return (
                  <li key={el.id}>
                    <Lodging {...el} onClick={() => updateLikeLodging(el.id)} />
                  </li>
                );
              })}
        </Carousel>
      </div>
    </main>
  );
}
