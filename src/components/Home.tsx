import RecommendPlaceList from '@/components/selectbox/RecommendPlaceList';
import Selectbox from '@/components/selectbox/Selectbox';
import type { RecommendPlaceResponse } from '@/components/selectbox/types/type';
import { useCallback, useEffect, useRef, useState } from 'react';
import SearchBar from '@/components/searchbar/SearchBar';

import Carousel from '@/components/carousel/Carousel';
import { searchbarElements } from '@/components/searchbar/mocks/searchbar';
import { useGetLodgingList } from '@/components/lodging/hooks/useGetLodgingList';
import type { LodgingProps } from '@/components/lodging/types/lodging';
import Lodging from '@/components/lodging/Lodging';
import SkeletonLodging from '@/components/lodging/SkeletonLodging';
import { LODGING_WIDTH } from '@/components/lodging/constants/constant';
import { useSkeletonUI } from '@/components/lodging/hooks/useSkeletonUI';
import { useUpdateLodgingLike } from '@/components/lodging/hooks/useUpdateLodgingLike';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { lodgings, error, isLoading } = useGetLodgingList<LodgingProps>();
  const { mutate: updateLikeLodging } = useUpdateLodgingLike();
  const { skeletonCount } = useSkeletonUI({ containerRef, itemWidth: LODGING_WIDTH });

  const ref = useRef<HTMLSpanElement | null>(null);
  const [data, setData] = useState<RecommendPlaceResponse[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  /**
   * selectbox prop
   *
   * 1. api로 받아온 데이터(mocks 폴더에서 import)
   *   - data: [{
   *       title: string,
   *       items: RecommendPlaceResponse[]
   *    }]
   * TODO
   * 2. 사용자가 검색한 목록
   */

  const handleClickSelectbox = useCallback(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    import('@/components/selectbox/mocks/data.json').then((res) => setData(res.default));
  }, []);

  if (error) return <>Something Error happen</>;

  return (
    <main className="w-full h-full flex flex-col justify-center items-center space-y-32">
      <a href="/test" className="px-6 py-2 rounded-2xl shadow-lg">
        react-query Infinite scroll
      </a>

      <span
        className="w-24 border p-4 rounded-lg cursor-pointer"
        onClick={handleClickSelectbox}
        ref={ref}
      >
        임시 selectbox
      </span>
      <Selectbox isOpen={isOpen} setIsOpen={setIsOpen} excludeClickRef={ref}>
        <RecommendPlaceList data={data} />
      </Selectbox>

      <SearchBar elements={searchbarElements} />

      <div className="w-[1400px] space-y-6" ref={containerRef}>
        <Carousel>
          {isLoading
            ? Array.from({ length: skeletonCount }).map(() => <SkeletonLodging />)
            : lodgings.map((el) => {
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
