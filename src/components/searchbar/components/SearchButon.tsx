import search from '@/components/searchbar/assets/search.svg';
import { useSearchBar } from '@/components/searchbar/hooks/useSearchBar';

export default function SearchButon() {
  const { activeMenu } = useSearchBar();

  const isMenuActive = activeMenu !== -1;

  return (
    <div
      className={`flex space-x-1 items-center h-4 ${
        isMenuActive ? 'w-12' : 'w-4'
      } transition-all duration-500`}
    >
      <img className="w-4 h-4" src={search} alt="search image" />
      <span
        className={`text-sm min-w-fit whitespace-nowrap font-semibold text-white duration-200 opacity-0 invisible ${
          isMenuActive ? 'visible opacity-100' : ''
        }`}
      >
        검색
      </span>
    </div>
  );
}
