import type { ChildElementProps, ChildProps } from '@/components/carousel/custom-carousel/types';
import React, { cloneElement, isValidElement } from 'react';

type GetValidItemsProps = {
  children: React.ReactNode;
  visibleCount?: number;
};

export const getValidItems = ({ children, visibleCount }: GetValidItemsProps) => {
  return (
    React.Children.map(children, (child, idx) =>
      isValidElement(child)
        ? cloneElement(child as ChildProps, {
            className: `${(child.props as ChildElementProps).className ?? ''} shrink-0`,
            style: { width: `calc(100% / ${visibleCount || 1})` },
            'data-index': idx,
          })
        : child
    ) || []
  );
};
