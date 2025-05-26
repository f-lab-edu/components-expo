import type { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

export type InputProps = {
  required?: boolean;
  disabled?: boolean;
  labelText?: string;
  registerKey?: string;
  register?: UseFormRegister<any>;
  requiredPattern?: {
    required: string;
    pattern: {
      value: any;
      message: string;
    };
  };
  errors?: FieldErrors<FieldValues>;
};
