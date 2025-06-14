import Selectbox from '@/components/selectbox/Selectbox';
import type { RecommendPlace } from '@/components/selectbox/types/type';
import { useEffect, useState } from 'react';

export default function Home() {
  /**
   * selectbox prop
   *
   * 1. api로 받아온 데이터(mocks 폴더에서 import)
   *   - data: [{
   *       title: string,
   *       items: RecommendPlace[]
   *    }]
   * TODO
   * 2. 사용자가 검색한 목록
   */

  const [data, setData] = useState<RecommendPlace[]>([]);

  useEffect(() => {
    import('@/components/selectbox/mocks/data.json').then((res) => setData(res.default));
  }, []);

  return (
    <main className="w-full h-full flex items-center justify-center">
      <Selectbox data={data} />
    </main>
  );
}
