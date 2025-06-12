import Carousel from '@/components/carousel/Carousel';
import MyCarousel from '@/components/carousel/MyCarousel';
import RankingMovie from '@/components/movie/RankingMovie';
import { movies } from '@/mock/data';

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-[1400px] mb-5">
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
      <div className="w-[1400px]">
        <MyCarousel>
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
        </MyCarousel>
      </div>
    </main>
  );
}
