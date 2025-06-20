import type { RecommendPlaceResponse } from '@/components/selectbox/types/type';

type SelectBoxOptionProps = {
  children: React.ReactNode;
  value: RecommendPlaceResponse['items'][number];
};

export default function SelectboxOption({ children, value }: SelectBoxOptionProps) {
  const { itemId, itemTitle } = value;

  const handleClickItem = () => {
    // TODO: 상태 관리에 active 데이터 등록
    console.log({ itemId, itemTitle });
  };

  return (
    <li
      data-value={itemId}
      className="flex items-center w-full p-2 hover:bg-[#ebebeb] rounded-2xl cursor-pointer"
      onClick={handleClickItem}
    >
      {children}
    </li>
  );
}
