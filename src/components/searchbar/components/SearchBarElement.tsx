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
        activeMenu !== -1 ? 'bg-[#ebebeb] hover:bg-[#ddd]' : 'bg-white hover:bg-[#ebebeb]'
      }`}
    >
      <div
        className={`absolute top-0 left-0 flex flex-col z-20 px-6 py-3 ${exceptFirstChild}`}
        onClick={handleClickElement}
      >
        <span className="text-xs font-semibold"> {title} </span>
        <div className="mt-1 text-sm">{content}</div>
      </div>
      {isActiveMenu && (
        <div className="absolute top-0 left-0 z-10 w-full h-full bg-white shadow-lg"></div>
      )}
    </div>
  );
}
