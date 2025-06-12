import ArrowButton from '@/components/button/ArrowButton';
import React, { cloneElement, isValidElement, useRef, useState, type ReactElement } from 'react';

export type CarouselOptions = {
  draggable?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  infinite?: boolean;
  prevArrow?: React.JSX.Element;
  nextArrow?: React.JSX.Element;
};

type CarouselContainerProps = {
  children: React.ReactNode;
  options?: CarouselOptions;
};

type ChildElementProps = {
  className?: string;
  style?: object;
  onClick?: () => void;
  'data-index'?: number;
};
type ChildProps = ReactElement<ChildElementProps>;
type Direction = 'prev' | 'next';

export default function CarouselContainer({ children, options }: CarouselContainerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const wrapperRef = useRef<HTMLUListElement>(null);

  const scrollSlidesCnt = options?.slidesToScroll || 1;
  const showSlidesCnt = options?.slidesToShow || 1;
  const childrenLength = React.Children.count(children);

  const handleClickArrow = (direction: Direction) => {
    if (direction === 'next') {
      if (currentIndex + showSlidesCnt < childrenLength) {
        const _newCurrentIndex = Math.min(
          currentIndex + scrollSlidesCnt,
          childrenLength - showSlidesCnt
        );

        setCurrentIndex(_newCurrentIndex);
      }
    } else {
      if (currentIndex - showSlidesCnt >= 0) {
        setCurrentIndex((prev) => prev - scrollSlidesCnt);
      } else {
        setCurrentIndex(0);
      }
    }
  };

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
            onClick: () => handleClickArrow(direction === 'prev' ? 'prev' : 'next'),
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

  const getPosition = () => {
    if (!wrapperRef.current) return;

    const percentPerSlide = wrapperRef.current.offsetWidth / (options?.slidesToShow || 1);
    return { transform: `translateX(-${currentIndex * percentPerSlide}px)` };
  };

  return (
    <div className="container w-full relative">
      {options?.prevArrow && isValidElement(options.prevArrow) && getArrowButton('prev')}
      <div className="wrapper w-full h-fit overflow-hidden">
        <ul className={`flex transition duration-500`} style={getPosition()} ref={wrapperRef}>
          {React.Children.map(children, (child, idx) =>
            isValidElement(child)
              ? cloneElement(child as ChildProps, {
                  className: `${(child.props as ChildElementProps).className ?? ''} shrink-0`,
                  style: { width: `calc(100% / ${options?.slidesToShow || 1})` },
                  'data-index': idx,
                })
              : child
          )}
        </ul>
      </div>
      {options?.nextArrow && isValidElement(options.nextArrow) && getArrowButton('next')}
    </div>
  );
}
