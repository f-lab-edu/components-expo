import SelectBoxItem from '@/components/selectbox/components/SelectBoxItem';
import RecommendPlace from '@/components/selectbox/RecommendPlace';
import type { RecommendPlaceResponse } from '@/components/selectbox/types/type';

type RecommendPlaceListProps = {
  data: RecommendPlaceResponse[];
};

export default function RecommendPlaceList({ data }: RecommendPlaceListProps) {
  return (
    <>
      {data.map((group, idx) => {
        const { title, items } = group;

        return (
          <div key={`${title}-${idx}`} className="flex flex-col py-6 px-3 overflow-y-scroll">
            <span className="text-sm mb-2">{title}</span>
            <ul key={idx} className="flex flex-col space-y-2">
              {items.map((item) => (
                <SelectBoxItem key={item.itemId} value={{ ...item }}>
                  <RecommendPlace {...item} />
                </SelectBoxItem>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
}
