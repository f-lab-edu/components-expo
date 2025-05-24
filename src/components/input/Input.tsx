import type { InputProps } from '@/types/input';

export default function Input({ labelText, required, disabled }: InputProps) {
  return (
    <div className="flex items-center">
      {labelText && (
        <div className="w-20 mr-3">
          <label
            className={`mr-4 ${
              !disabled && required ? 'after:content-["*"]  after:text-red-500' : ''
            }`}
            htmlFor=""
          >
            {labelText}
          </label>
        </div>
      )}
      <input
        type="text"
        className={`w-52 px-3 py-2 border border-[#808080] rounded-md outline-none text-sm ${
          disabled ? 'bg-gray-200 text-gray-500' : ''
        }`}
        placeholder="placeholder..."
        required={required}
        disabled={disabled}
      />
    </div>
  );
}
