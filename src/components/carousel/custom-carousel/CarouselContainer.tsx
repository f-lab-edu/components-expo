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

  const { items, wrapperRef, trackRef, handleNext, handlePrev, bind, itemStyle, trackStyle } =
    useCarousel({
      items: getValidItems({ children, visibleCount: showSlidesCnt || 1 }),
      visibleCount: showSlidesCnt || 1,
      infinite: isInfinite,
    });

  // const scrollSlidesCnt = options?.slidesToScroll || 1;
  // const childrenLength = React.Children.count(children);

  // const [currentIndex, setCurrentIndex] = useState(isInfinite ? showSlidesCnt + 1 : 0);

  // const _items = getValidItems({ children, visibleCount: options?.slidesToShow || 1 });
  // const [items, setItems] = useState<React.ReactNode>([]);
  // const [transition, setTransition] = useState(true);

  // const handleClickArrow = (direction: Direction) => {
  //   if (direction === 'next') {
  //     if (currentIndex + showSlidesCnt < childrenLength) {
  //       const _newCurrentIndex = Math.min(
  //         currentIndex + scrollSlidesCnt,
  //         childrenLength - showSlidesCnt
  //       );

  //       console.log('dd: ', currentIndex, ', slidesCnt: ', scrollSlidesCnt);

  //       setCurrentIndex(_newCurrentIndex);
  //     } else if (isInfinite) {
  //       setCurrentIndex(10);
  //     }
  //   } else {
  //     if (currentIndex - showSlidesCnt >= 0) {
  //       setCurrentIndex((prev) => prev - scrollSlidesCnt);
  //     } else {
  //       setCurrentIndex(0);
  //     }
  //   }
  // };

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
            // onClick: () => handleClickArrow(direction === 'prev' ? 'prev' : 'next'),
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

  // const getPosition = (needsTransition: boolean = true) => {
  //   if (!trackRef.current) return;

  //   const percentPerSlide = trackRef.current.offsetWidth / (options?.slidesToShow || 1);
  //   return {
  //     transform: `translateX(-${currentIndex * percentPerSlide}px)`,
  //     transition: needsTransition ? '' : 'none',
  //   };
  // };

  // useLayoutEffect(() => {
  //   if (trackRef.current) {
  //     const data = isInfinite
  //       ? [..._items.slice(-showSlidesCnt), ..._items, ..._items.slice(0, showSlidesCnt)]
  //       : [..._items];
  //   }
  // }, []);

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
