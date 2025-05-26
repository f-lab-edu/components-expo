import React, { useState } from 'react';
import Input from './Input';

export default function ExhibitionInput() {
  const [disabled, setDisabled] = useState(false);
  const [required, setRequired] = useState(false);

  const handleClickCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'disabled') {
      setDisabled((prev) => !prev);
    } else {
      setRequired((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Input labelText="input" required={required} disabled={disabled} />

      <div className="flex gap-2">
        <p className="flex items-center space-x-1">
          <input
            type="checkbox"
            className="outline-none"
            id="disabled"
            onChange={handleClickCheckbox}
          />
          <label htmlFor="disabled">disabled</label>
        </p>
        <p className="flex items-center space-x-1">
          <input
            type="checkbox"
            className="outline-none"
            id="required"
            onChange={handleClickCheckbox}
            disabled={disabled}
          />
          <label htmlFor="required">required</label>
        </p>
      </div>
    </div>
  );
}
