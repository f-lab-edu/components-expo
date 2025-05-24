type ButtonType = 'plain' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export type ButtonProps = {
  type: ButtonType;
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  size: ButtonSize;
};
