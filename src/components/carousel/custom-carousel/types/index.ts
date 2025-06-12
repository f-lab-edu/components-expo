import type { ReactElement } from 'react';

export type CarouselOptions = {
  draggable?: boolean;
  slidesToShow?: number;
  slidesToScroll?: number;
  infinite?: boolean;
  prevArrow?: React.JSX.Element;
  nextArrow?: React.JSX.Element;
};

export type CarouselContainerProps = {
  children: React.ReactNode;
  options?: CarouselOptions;
};

export type ChildElementProps = {
  className?: string;
  style?: object;
  onClick?: () => void;
  'data-index'?: number;
};
export type ChildProps = ReactElement<ChildElementProps>;
export type Direction = 'prev' | 'next';
