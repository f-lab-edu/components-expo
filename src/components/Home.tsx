import Carousel from '@/components/carousel/Carousel';
import RankingMovie from '@/components/movie/RankingMovie';
import type { RankingMovieProps } from '@/types/movie';

export default function Home() {
  const movies: RankingMovieProps[] = [
    {
      title: '광장',
      thumbnail:
        'https://occ-0-1360-2218.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABU0KzLjh8-ufspnsU3yb4cDikg9Z0oGRB_VtdhXrW1GhqDlMLtcMxhklHTCBOw1OzqsHpZoXTC6XIS2G26PQiDmNdo770xARv-YOYom9ut2Pt5NCyNLVffG84HALiNPVbE69.webp?r=4bd',
      ranking: 1,
    },
    {
      title: '폭삭 속았수다',
      thumbnail:
        'https://occ-0-1360-2218.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABa3LddZM6e3719vZE4g_mygU0Rl8lul4vBIqEA-3VSdPwry0DaTgaxVmtuAmmGjs5DSlX0iMe-p3nTs536XH9Csmv05wD9O4riNoeRMiYheEgCxLAQkp5SRRpDLTJStna3jH.webp?r=975',
      ranking: 2,
    },
    {
      title: '슬기로운 의사 생활',
      thumbnail:
        'https://occ-0-1360-2218.1.nflxso.net/dnm/api/v6/mAcAr9TxZIVbINe88xb3Teg5_OA/AAAABZHT43lPCeDhIayLaP9HuYeK8YriY4KLQGtnWWXksPdITtkQLUIMLiGUiDZUom9vb6fsvizzhBU0cK1ixfoFABK6Xlr22Bawpws.webp?r=d52',
      ranking: 3,
    },
  ];

  return (
    <main className="w-full h-full flex items-center justify-center">
      <div className="w-[1000px]">
        <Carousel>
          {movies.map(({ thumbnail, ranking }) => (
            <li key={ranking}>{<RankingMovie thumbnail={thumbnail} ranking={ranking} />}</li>
          ))}
        </Carousel>
      </div>
    </main>
  );
}
