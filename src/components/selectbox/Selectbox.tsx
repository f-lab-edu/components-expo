import type { RecommendPlace } from '@/components/selectbox/types/type';

type SelectboxProps = {
  data: RecommendPlace[];
};

export default function Selectbox({ data }: SelectboxProps) {
  return (
    <div className="flex flex-col py-3 pl-3 pr-1 rounded-3xl h-[540px] overflow-hidden shadow-lg">
      {data.map((group, idx) => {
        const { title, items } = group;

        return (
          <div className="flex flex-col py-6 px-3 overflow-y-scroll">
            <span className="text-sm mb-2">{title}</span>
            <ul key={idx} className="flex flex-col space-y-2">
              {items.map((item) => {
                const { itemId, itemTitle, image, description } = item;
                return (
                  <li
                    key={itemId}
                    value={itemId}
                    className="flex items-center w-full p-2 hover:bg-[#ebebeb] rounded-2xl cursor-pointer"
                  >
                    <img
                      src={
                        image ||
                        'https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg'
                      }
                      alt={`${itemTitle} image`}
                      className="w-12 object-cover mr-2"
                    />
                    <p className="flex flex-col ml-2">
                      <span>{itemTitle}</span>
                      <span>{description}</span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
