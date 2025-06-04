import { useState } from 'react';
import Input from './Input';
import { useForm } from 'react-hook-form';
// import { EMAIL_INPUT, PHONE_INPUT } from '@/constants/input';
import { EMAIL_INPUT, PHONE_INPUT } from '../../constants/input';

type FormValues = {
  phone?: string;
  email?: string;
};

export default function ExhibitionInputGroup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState('');

  const onSubmit = (data: FormValues, ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setData(JSON.stringify(data));
  };

  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <form
        onSubmit={(ev) => {
          handleSubmit((data) => onSubmit(data, ev))(ev);
        }}
      >
        <div className="group flex flex-col p-2 gap-2">
          <Input register={register} registerKey="name" labelText="이름" />
          <Input
            register={register}
            registerKey="phone"
            labelText="연락처"
            required
            requiredPattern={PHONE_INPUT}
            errors={errors}
          />
          <Input
            register={register}
            registerKey="email"
            labelText="이메일"
            required
            requiredPattern={EMAIL_INPUT}
            errors={errors}
          />
          <Input labelText="disabled" disabled />
        </div>

        <input
          className="border rounded-md p-3 absolute top-3 right-3 cursor-pointer hover:bg-gray-200 transition "
          type="submit"
        />
      </form>
      <p className="absolute bottom-3 left-1/2 -translate-x-1/2 w-full text-xs">{data}</p>
    </div>
  );
}
