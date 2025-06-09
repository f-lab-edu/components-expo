import { useState, type Dispatch, type SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import CloseIcon from '@/assets/close.svg';

type ModalProps = {
  onClose: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  domNode?: Element;
};

export default function Modal({ children, onClose, domNode }: ModalProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClickOutSide = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose((prev) => !prev);
    }
  };

  const handleEnter = () => {
    setIsActive(true);
  };

  const handleLeave = () => {
    setTimeout(() => {
      setIsActive(false);
    }, 300);
  };

  return createPortal(
    <section
      className={`modal-overlay w-full h-full flex justify-center items-center bg-black/20 top-0 left-0 z-20 ${
        domNode ? 'absolute' : 'fixed'
      }`}
      onClick={handleClickOutSide}
    >
      <div className="flex justify-center items-center w-[40%] h-[40%] p-4 bg-white relative rounded-md">
        <div
          className={`absolute right-3 top-3 border border-transparent rounded-full p-2 cursor-pointer transition ${
            isActive ? 'bg-gray-200' : ''
          }`}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <img src={CloseIcon} onClick={() => onClose((prev) => !prev)} alt="close icon" />
        </div>
        {children}
      </div>
    </section>,
    domNode || document.body
  );
}
