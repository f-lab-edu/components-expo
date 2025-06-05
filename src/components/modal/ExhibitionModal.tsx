import Modal from '@/components/modal/Modal';
import { useState } from 'react';

export default function ExhibitionModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickButton = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <button className="border px-2 py-3 rounded-md" onClick={handleClickButton}>
        open global modal
      </button>
      {isOpen && (
        <Modal onClose={setIsOpen}>
          <h2 className="font-bold text-2xl">Modal Test</h2>
        </Modal>
      )}
    </div>
  );
}
