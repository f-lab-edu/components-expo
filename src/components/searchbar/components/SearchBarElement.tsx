import { useSearchBar } from '@/components/searchbar/hooks/useSearchBar';
import type { Dispatch, SetStateAction } from 'react';

type SearchBarElementProps = {
  title: string;
  content: string | React.ReactNode;
  index?: number;
  isFirstChild?: boolean;
  isActiveMenu?: boolean;
  setActiveMenu?: Dispatch<SetStateAction<number>>;
};

export default function SearchBarElement({
  title,
  content,
  index,
  isFirstChild,
  isActiveMenu,
  setActiveMenu,
}: SearchBarElementProps) {
  const { activeMenu } = useSearchBar();
  const isMenuActive = activeMenu !== -1;

  const exceptFirstChild = !isFirstChild
    ? "relative before:content-['|'] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:text-gray-300"
    : '';

  const handleClickElement = () => {
    if (setActiveMenu) {
      setActiveMenu(index!);
    }
  };

  return (
    <div
      className={`relative rounded-4xl cursor-pointer overflow-hidden ${
        isMenuActive ? 'bg-[#ebebeb] hover:bg-[#ddd]' : 'bg-white hover:bg-[#ebebeb]'
      }`}
    >
      <div
        className={`absolute top-0 left-0 flex flex-col z-20 px-6 py-3 ${exceptFirstChild}`}
        onClick={handleClickElement}
      >
        <span className="text-xs font-semibold"> {title} </span>
        <div className="mt-1 text-sm">{content}</div>
      </div>

      <div
        className={`absolute top-0 left-0 w-0 opacity-0 z-10 h-full bg-white shadow-lg transition origin-center ${
          isActiveMenu ? 'opacity-100 w-full' : ''
        }`}
      ></div>
    </div>
  );
}
