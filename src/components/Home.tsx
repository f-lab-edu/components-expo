import SearchBar from '@/components/searchbar/SearchBar';
import SearchBarElement from '@/components/searchbar/components/SearchBarElement';

export default function Home() {
  return (
    <main className="w-full h-full flex justify-center items-center">
      <SearchBar>
        <SearchBarElement
          title="여행지"
          content={<input className=" outline-none" type="text" placeholder="여행지 검색" />}
        />
        <SearchBarElement title="체크인" content="날짜 추가" />
        <SearchBarElement title="체크아웃" content="날짜 추가" />
        <SearchBarElement title="여행자" content="게스트 추가" />
      </SearchBar>
    </main>
  );
}
