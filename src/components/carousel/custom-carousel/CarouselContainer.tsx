import ArrowButton from '@/components/button/ArrowButton';
import { useCarousel } from '@/components/carousel/custom-carousel/hooks/useCarousel';
import type {
  CarouselContainerProps,
  ChildElementProps,
  ChildProps,
  Direction,
} from '@/components/carousel/custom-carousel/types';
import { getValidItems } from '@/components/carousel/custom-carousel/utils/utils';
import React, { isValidElement } from 'react';

export default function CarouselContainer({ children, options }: CarouselContainerProps) {
  const isInfinite = options?.infinite;
  const showSlidesCnt = options?.slidesToShow || 1;
  const scrollCount = options?.slidesToScroll || 1;

  const { items, wrapperRef, trackRef, handleNext, handlePrev, bind, itemStyle, trackStyle } =
    useCarousel({
      items: getValidItems({ children, visibleCount: showSlidesCnt || 1 }),
      visibleCount: showSlidesCnt || 1,
      scrollCount,
      infinite: isInfinite,
      autoPlay: options?.autoPlay,
      autoPlaySpeed: options?.autoPlaySpeed,
      draggable: options?.draggable,
      swipeable: options?.swipeable,
    });

  const getArrowButton = (direction: Direction) => {
    return (
      <div
        className={`arrow absolute top-1/2 -translatey-1/2 z-10 cursor-pointer ${
          direction === 'prev' ? '-left-12' : '-right-12'
        }`}
      >
        {React.cloneElement(
          options!.prevArrow as ChildProps,
          {
            className: `${
              (options!.prevArrow!.props as ChildElementProps).className ?? ''
            } custom-button`,
            onClick: direction === 'prev' ? handlePrev : handleNext,
          },
          <div
            className={`rounded-full p-3 before:relative bg-white ${
              direction === 'next' ? 'rotate-y-180' : ''
            }`}
          >
            <ArrowButton />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container flex items-center w-full relative">
      {options?.prevArrow && isValidElement(options.prevArrow) && getArrowButton('prev')}
      <div className="wrapper w-full h-fit overflow-hidden" ref={wrapperRef}>
        <ul className={`flex`} style={trackStyle} ref={trackRef} {...bind}>
          {items.map((item, index) => (
            <div className="flex shrink-0 " key={index} style={itemStyle}>
              {item}
            </div>
          ))}
        </ul>
      </div>
      {options?.nextArrow && isValidElement(options.nextArrow) && getArrowButton('next')}
    </div>
  );
}
