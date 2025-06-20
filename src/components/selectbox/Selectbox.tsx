import SelectboxOption from '@/components/selectbox/components/SelectBoxOption';
import useOutsideClick from '@/components/selectbox/hooks/useOutsideClick';
import SelectboxGroup from '@/components/selectbox/SelectboxGroup';
import { useRef, type SetStateAction } from 'react';

type SelectboxProps = {
  children: React.ReactNode;
  isCloseOnClickOutside?: boolean;
  isCloseOnPressedESC?: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  excludeClickRef: React.RefObject<HTMLElement | null>;
};

const Selectbox = ({
  children,
  isCloseOnClickOutside = true,
  isCloseOnPressedESC = true,
  isOpen,
  setIsOpen,
  excludeClickRef,
}: SelectboxProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref,
    excludeClickRef,
    isCloseOnClickOutside,
    isCloseOnPressedESC,
    handler: () => setIsOpen(false),
  });

  return (
    isOpen && (
      <div
        className="flex flex-col py-3 pl-3 pr-1 rounded-3xl h-[540px] overflow-hidden shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-30"
        ref={ref}
      >
        {children}
      </div>
    )
  );
};

Selectbox.Group = SelectboxGroup;
Selectbox.option = SelectboxOption;

export default Selectbox;
