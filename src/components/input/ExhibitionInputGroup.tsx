import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/input/Input.tsx';
import { EMAIL_INPUT, PHONE_INPUT } from '@/constants/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type FormValues = {
  phone?: string;
  email?: string;
};

const phoneRegex = /^010\d{8}$/;

const InputSchema = z.object({
  name: z
    .string()
    .min(2, '이름은 최소 2글자 이상입니다.')
    .max(7, '이름은 최대 7글자까지 가능합니다.'),
  email: z.string().email('email 형식에 맞게 입력해주세요.'),
  phone: z
    .string()
    .min(11, '전화번호는 최소 11자리이여야 합니다.')
    .max(11, '전화번호는 최대 11자리이여야 합니다.')
    .refine((value) => phoneRegex.test(value), '010으로 시작하는 11자리 숫자를 입력해주세요'),
});

type InputType = z.infer<typeof InputSchema>;

export default function ExhibitionInputGroup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(InputSchema),
  });

  const [data, setData] = useState('');

  const onSubmit = (data: FormValues, ev: React.FormEvent<HTMLFormElement>) => {
    ev.stopPropagation();
    setData(JSON.stringify(data));
  };

  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <form onSubmit={(ev) => handleSubmit((data) => onSubmit(data, ev))(ev)}>
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
