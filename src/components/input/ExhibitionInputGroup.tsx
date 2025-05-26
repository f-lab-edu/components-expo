import { useState, type MouseEvent } from 'react';
import Input from './Input';
import { useForm } from 'react-hook-form';
// import { EMAIL_INPUT, PHONE_INPUT } from '@/constants/input';
import { EMAIL_INPUT, PHONE_INPUT } from '../../constants/input';

export default function ExhibitionInputGroup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState('');

  const handleClickSubmit = (e: MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
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

        <button
          className="border rounded-md p-3 absolute top-3 right-3 cursor-pointer hover:bg-gray-200 transition "
          onClick={handleClickSubmit}
        >
          submit
        </button>
        {data}
      </form>
    </div>
  );
}
