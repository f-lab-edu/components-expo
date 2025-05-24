import { useButton } from '../../hooks/useButton';
import type { ButtonProps } from '@/types/button';

export default function Button({ data }: { data: ButtonProps }) {
  const { text, buttonStyle, disabled, onClick } = useButton(data);

  return (
    <button className={` ${buttonStyle}`} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
}
