import { useGetDataInfinite } from '@/components/lodging/hooks/useGetDataInfinite';
import ImpressionArea from '@/components/lodging/ImpressionArea';
import Lodging from '@/components/lodging/Lodging';
import type { LodgingProps } from '@/components/lodging/types/lodging';
import React from 'react';

const fetchLodgingList = async (pageParam: number) => {
  const response = await fetch(`/api/lodgings?offset=${pageParam}`);
  const result = await response.json();
  return result;
};

export default function LodgingTest() {
  const {
    data: lodgings,
    error,
    fetchNextPage,
    hasNextPage,
  } = useGetDataInfinite({
    queryKey: ['get-lodgings-infinite'],
    fetchFunc: fetchLodgingList,
  });

  const handleIntersect = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (error) return <>somthing is wrong</>;

  return (
    <div className="w-full h-full flex justify-center items-center bg-amber-100 overflow-hidden">
      <ul className="h-full grid grid-cols-2 gap-2 overflow-y-scroll">
        {lodgings?.pages?.map((group, i) => {
          return (
            <React.Fragment key={i}>
              {(group.data as LodgingProps[]).map((lodging) => (
                <li key={lodging.id}>
                  <Lodging {...lodging} />
                </li>
              ))}
            </React.Fragment>
          );
        })}
        <ImpressionArea onIntersect={handleIntersect} />
      </ul>
    </div>
  );
}
