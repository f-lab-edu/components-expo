import { useEffect } from 'react';

type UseOutsideClickProps = {
  ref: React.RefObject<HTMLElement | null>;
  isCloseOnClickOutside: boolean;
  isCloseOnPressedESC: boolean;
  handler: () => void;
};

export default function useOutsideClick({
  ref,
  isCloseOnClickOutside,
  isCloseOnPressedESC,
  handler,
}: UseOutsideClickProps) {
  useEffect(() => {
    let isJustOpened = true;

    const handleClickOutside = (e: MouseEvent) => {
      if (isJustOpened) {
        isJustOpened = false;
        return;
      }

      console.log('설마');
      if (ref.current && !ref.current.contains(e.target as Node) && isCloseOnClickOutside) {
        handler();
      }
    };

    const handlePressESC = () => {
      if (isCloseOnPressedESC) {
        handler();
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keypress', handlePressESC);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keypress', handlePressESC);
    };
  }, [ref]);
}
