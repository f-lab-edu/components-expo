import SearchBar from '@/components/searchbar/SearchBar';
import SearchBarElement from '@/components/searchbar/components/SearchBarElement';

import Carousel from '@/components/carousel/Carousel';
import RankingMovie from '@/components/movie/RankingMovie';
import { movies } from '@/mock/data';

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col justify-center items-center space-y-32">
      <SearchBar>
        <SearchBarElement
          title="여행지"
          content={<input className=" outline-none" type="text" placeholder="여행지 검색" />}
        />
        <SearchBarElement title="체크인" content="날짜 추가" />
        <SearchBarElement title="체크아웃" content="날짜 추가" />
        <SearchBarElement title="여행자" content="게스트 추가" />
      </SearchBar>

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
