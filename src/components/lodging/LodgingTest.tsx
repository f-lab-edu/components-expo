import { useInfiniteScroll } from '@/components/lodging/hooks/useInfiniteScroll';
import Lodging from '@/components/lodging/Lodging';
import type { LodgingProps } from '@/components/lodging/types/lodging';
import React, { useRef } from 'react';

export default function LodgingTest() {
  const containerRef = useRef<HTMLUListElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const { lodging } = useInfiniteScroll({ containerRef, targetRef });

  return (
    <div className="w-full h-full flex justify-center items-center bg-amber-100 overflow-hidden">
      <ul className="h-full grid grid-cols-2 gap-2 overflow-y-scroll" ref={containerRef}>
        {lodging?.pages?.map((group, i) => {
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
        <div ref={targetRef}></div>
      </ul>
    </div>
  );
}
