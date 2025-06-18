import SearchBar from '@/components/searchbar/SearchBar';

import Carousel from '@/components/carousel/Carousel';
import RankingMovie from '@/components/movie/RankingMovie';
import { movies } from '@/mock/data';
import { searchbarElements } from '@/components/searchbar/mocks/searchbar';

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col justify-center items-center space-y-32">
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
