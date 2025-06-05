import Modal from '@/components/modal/Modal';
import { useState } from 'react';

export default function ExhibitionLocalModal() {
  const node = document.querySelector('#local');
  const [isOpen, setIsOpen] = useState(false);

  const handleClickButton = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div id="local" className="w-full h-full flex justify-center items-center relative">
      <button className="border px-2 py-3 rounded-md" onClick={handleClickButton}>
        open local modal
      </button>
      {isOpen && (
        <Modal onClose={setIsOpen} domNode={node!}>
          <h2 className="font-bold text-2xl">Modal Test</h2>
        </Modal>
      )}
    </div>
  );
}
