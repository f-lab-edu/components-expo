import React, { isValidElement, type ReactElement } from 'react';

type BgDarkHover = {
  children: React.ReactNode;
};

type ReactElementProp = {
  className?: string;
};

export default function BgDarkHover({ children }: BgDarkHover) {
  return React.Children.map(children, (child) => {
    if (isValidElement(child)) {
      return React.cloneElement(child as ReactElement<ReactElementProp>, {
        className: 'hover:bg-blend-darken',
      });
    }
    return null;
  });
}
