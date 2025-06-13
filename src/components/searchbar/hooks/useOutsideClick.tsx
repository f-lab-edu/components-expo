import { useEffect } from 'react';

type UseOutsideClickProps = [ref: React.RefObject<HTMLElement | null>, onClickOutside: () => void];

export default function useOutsideClick(
  ref: UseOutsideClickProps[0],
  onClickOutside: UseOutsideClickProps[1]
) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, onClickOutside]);
}
