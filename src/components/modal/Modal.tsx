import type { Dispatch, SetStateAction } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  onClose: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

export default function Modal({ children, onClose }: ModalProps) {
  const handleClickOutSide = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose((prev) => !prev);
    }
  };
  return createPortal(
    <section
      className="modal-overlay w-full h-full flex justify-center items-center bg-black/20 fixed top-0 left-0 z-20"
      onClick={handleClickOutSide}
    >
      <div className="flex justify-center items-center w-[500px] h-[300px] p-4 bg-white relative rounded-md">
        <button className="absolute right-4 top-4" onClick={() => onClose((prev) => !prev)}>
          X
        </button>
        {children}
      </div>
    </section>,
    document.body
  );
}
