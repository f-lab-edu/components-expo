import type { Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  onClose: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  domNode?: Element;
};

export default function Modal({ children, onClose, domNode }: ModalProps) {
  const handleClickOutSide = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose((prev) => !prev);
    }
  };
  return createPortal(
    <section
      className={`modal-overlay w-full h-full flex justify-center items-center bg-black/20 top-0 left-0 z-20 ${
        domNode ? 'absolute' : 'fixed'
      }`}
      onClick={handleClickOutSide}
    >
      <div className="flex justify-center items-center w-[40%] h-[40%] p-4 bg-white relative rounded-md">
        <button className="absolute right-2 top-2" onClick={() => onClose((prev) => !prev)}>
          X
        </button>
        {children}
      </div>
    </section>,
    domNode || document.body
  );
}
