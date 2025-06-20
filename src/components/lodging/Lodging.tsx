import type { LodgingProps } from '@/components/lodging/types/lodging';
import Heart from '@/components/lodging/assets/heart.svg';
import FilledHeart from '@/components/lodging/assets/filledHeart.svg';

export default function Lodging({
  id,
  days,
  image,
  isGuestPreferred,
  isLiked,
  rate,
  title,
  totalPrice,
  usingDate,
  onClick,
}: LodgingProps) {
  const handleClickLodging = () => {};

  const handleClickLike = () => {
    if (onClick) onClick(id);
  };

  return (
    <div className="flex flex-col w-48 cursor-pointer" onClick={handleClickLodging}>
      <div className="overflow-hidden relative rounded-xl">
        <img className="aspect-square" src={image} alt={`${title} image`} />
        {isGuestPreferred && (
          <span className="absolute top-3 left-3 border w-20 p-1 rounded-2xl bg-neutral-100 text-center text-xs font-semibold">
            게스트 선호
          </span>
        )}
        {
          <img
            src={isLiked ? FilledHeart : Heart}
            className="absolute top-3 right-3 hover:scale-110"
            onClick={handleClickLike}
          />
        }
      </div>
      <div className="flex flex-col">
        <h3 className="">{title}</h3>
        <p className="space-x-0.5 text-xs text-[#222222]">
          <span className="block">{usingDate}</span>
          <span>{totalPrice}</span>
          <span>{days}</span>
          <span className='before:content-["★"] before:top-1/2 before:-translate-y-1/2'>
            {rate}
          </span>
        </p>
      </div>
    </div>
  );
}
