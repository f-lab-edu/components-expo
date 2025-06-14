import { useEffect } from 'react';

type UseOutsideClickProps = {
  ref: React.RefObject<HTMLElement | null>;
  exceptRef: React.RefObject<HTMLElement | null>;
  isCloseOnClickOutside: boolean;
  isCloseOnPressedESC: boolean;
  handler: () => void;
};

export default function useOutsideClick({
  ref,
  exceptRef,
  isCloseOnClickOutside,
  isCloseOnPressedESC,
  handler,
}: UseOutsideClickProps) {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        isCloseOnClickOutside &&
        !ref.current.contains(e.target as Node) &&
        !exceptRef.current?.contains(e.target as Node) // 외부 클릭해도 닫히지 않을 예외 element
      ) {
        handler();
      }
    };

    const handleKeyDownESC = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCloseOnPressedESC) {
        handler();
      }
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDownESC);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDownESC);
    };
  }, [ref]);
}
