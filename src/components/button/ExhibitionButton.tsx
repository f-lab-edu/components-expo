import type { ButtonProps } from '../../types/button';
import Button from './Button';

export default function ExhibitionButton() {
  const data: ButtonProps = {
    type: 'plain',
    size: 'md',
    text: 'button',
  };

  return (
    <div className="grid grid-rows-3 grid-cols-3 gap-2 place-items-center">
      <Button data={{ ...data, size: 'sm' }} />
      <Button data={{ ...data, type: 'text', size: 'sm' }} />
      <Button data={{ ...data, size: 'sm', disabled: true }} />

      <Button data={data} />
      <Button data={{ ...data, type: 'text' }} />
      <Button data={{ ...data, disabled: true }} />

      <Button data={{ ...data, size: 'lg' }} />
      <Button data={{ ...data, type: 'text', size: 'lg' }} />
      <Button data={{ ...data, size: 'lg', disabled: true }} />
    </div>
  );
}
