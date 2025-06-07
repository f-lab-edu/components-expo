import type { InputProps } from '@/types/input';

export default function Input({
  register,
  registerKey,
  labelText,
  required,
  disabled,
  errors,
}: InputProps) {
  const isError = errors?.[registerKey || ''] ? true : false;
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
      <div className="flex flex-col">
        <input
          {...(registerKey && register ? register(registerKey, { required }) : {})}
          type="text"
          className={`w-52 px-3 py-2 border border-[#808080] rounded-md outline-none text-sm ${
            disabled ? 'bg-gray-200 text-gray-500' : ''
          } ${isError ? 'border-red-400' : ''}`}
          placeholder="placeholder..."
          disabled={disabled}
        />
        {errors?.[registerKey || ''] && (
          <span className="text-xs text-red-300">
            {errors?.[registerKey || '']?.message?.toString()}
          </span>
        )}
      </div>
    </div>
  );
}
