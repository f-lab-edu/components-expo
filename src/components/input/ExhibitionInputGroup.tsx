import type { MouseEvent } from 'react';
import Input from './Input';

export default function ExhibitionInputGroup() {
  const handleClickSubmit = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <form action="">
        <div className="group flex flex-col p-2 gap-2">
          <Input labelText="이름" />
          <Input labelText="연락처" required />
          <Input labelText="disabled" disabled />
        </div>

        <button
          className="border rounded-md p-3 absolute top-3 right-3 cursor-pointer hover:bg-gray-200 transition "
          onClick={handleClickSubmit}
        >
          submit
        </button>
      </form>
    </div>
  );
}
