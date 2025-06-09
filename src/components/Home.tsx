import Carousel from '@/components/carousel/Carousel';
import RankingMovie from '@/components/movie/RankingMovie';
import { movies } from '@/mock/data';

export default function Home() {
  return (
    <main className="w-full h-full flex items-center justify-center">
      <div className="w-[1400px]">
        <Carousel>
          {movies.map(({ thumbnail, ranking }) => (
            <li key={ranking}>{<RankingMovie thumbnail={thumbnail} ranking={ranking} />}</li>
          ))}
        </Carousel>
      </div>
    </main>
  );
}
