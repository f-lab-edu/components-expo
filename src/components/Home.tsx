import SearchBar from '@/components/searchbar/SearchBar';

import Carousel from '@/components/carousel/Carousel';
import { searchbarElements } from '@/components/searchbar/mocks/searchbar';
import { useGetLodgingList } from '@/components/lodging/hooks/useGetLodgingList';
import type { LodgingProps } from '@/components/lodging/types/lodging';
import Lodging from '@/components/lodging/Lodging';

export default function Home() {
  const { lodging, error, isLoading } = useGetLodgingList<LodgingProps>();

  if (isLoading) return <>data is loading...</>;
  if (error) return <>Something Error happen</>;

  return (
    <main className="w-full h-full flex flex-col justify-center items-center space-y-32">
      <SearchBar elements={searchbarElements} />

      <div className="w-[1400px]">
        <Carousel>
          {lodging.map((el) => {
            return (
              <li key={el.id}>
                <Lodging {...el} />
              </li>
            );
          })}
        </Carousel>
      </div>
    </main>
  );
}
