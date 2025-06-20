import Selectbox from '@/components/selectbox/Selectbox';
import type { RecommendPlaceResponse } from '@/components/selectbox/types/type';
import { useCallback, useEffect, useRef, useState } from 'react';
import SearchBar from '@/components/searchbar/SearchBar';

import Carousel from '@/components/carousel/Carousel';
import RankingMovie from '@/components/movie/RankingMovie';
import { movies } from '@/mock/data';
import RecommendPlace from '@/components/selectbox/RecommendPlace';
import { searchbarElements } from '@/components/searchbar/mocks/searchbar';

export default function Home() {
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

  const ref = useRef<HTMLSpanElement | null>(null);
  const [data, setData] = useState<RecommendPlaceResponse[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleClickSelectbox = useCallback(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    import('@/components/selectbox/mocks/data.json').then((res) => setData(res.default));
  }, []);

  return (
    <main className="w-full h-full flex flex-col justify-center items-center space-y-32">
      <span
        className="w-24 border p-4 rounded-lg cursor-pointer"
        onClick={handleClickSelectbox}
        ref={ref}
      >
        임시 selectbox
      </span>
      <Selectbox isOpen={isOpen} setIsOpen={setIsOpen} excludeClickRef={ref}>
        {data.map(({ title, items }, idx) => {
          return (
            <Selectbox.Group title={title}>
              {items.map((item) => (
                <Selectbox.option key={idx} value={item}>
                  <RecommendPlace {...item} />
                </Selectbox.option>
              ))}
            </Selectbox.Group>
          );
        })}
      </Selectbox>

      <SearchBar elements={searchbarElements} />

      <div className="w-[1400px]">
        <Carousel>
          {movies.map(({ thumbnail, ranking, description, categories }) => (
            <li key={ranking}>
              {
                <RankingMovie
                  thumbnail={thumbnail}
                  ranking={ranking}
                  description={description}
                  categories={categories}
                />
              }
            </li>
          ))}
        </Carousel>
      </div>
    </main>
  );
}
