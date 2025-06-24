import { useInputAutoComplete } from '@/hooks/useInputAutoComplete.tsx';

type InputAutoCompleteProps = {
  placeholder?: string;
};

export default function InputAutoComplete({ placeholder }: InputAutoCompleteProps) {
  const { inputValue, handleChange, onCompositionStart, onCompositionEnd } = useInputAutoComplete();

  return (
    <input
      type="text"
      className="w-full h-full pr-3 py-2 rounded-xl outline-none"
      value={inputValue}
      placeholder={placeholder}
      onChange={(e) => handleChange(e.target.value)}
      onCompositionStart={onCompositionStart}
      onCompositionEnd={onCompositionEnd}
    />
  );
}
