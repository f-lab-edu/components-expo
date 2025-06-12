import SearchBar from '@/components/searchbar/SearchBar';
import ExhibitionButton from './button/ExhibitionButton';
import Layout from './common/Layout';
import ExhibitionInput from './input/ExhibitionInput';
import ExhibitionInputGroup from './input/ExhibitionInputGroup';

export default function Home() {
  // const components = [
  //   <ExhibitionButton />,
  //   <ExhibitionInput />,
  //   <ExhibitionInputGroup />,
  //   4,
  //   5,
  //   6,
  //   7,
  //   8,
  //   9,
  // ];
  return (
    <main className="w-full h-full flex justify-center items-center">
      <SearchBar>
        <div>test</div>
        <div>test1</div>
        <div>test2</div>
        <div>test3</div>
      </SearchBar>
    </main>
  );
}
