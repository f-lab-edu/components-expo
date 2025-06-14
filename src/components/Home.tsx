import RecommendPlaceList from '@/components/selectbox/RecommendPlaceList';
import Selectbox from '@/components/selectbox/Selectbox';
import type { RecommendPlaceResponse } from '@/components/selectbox/types/type';
import { useCallback, useEffect, useRef, useState } from 'react';

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
    <main className="w-full h-full flex items-center justify-center relative">
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
    </main>
  );
}
