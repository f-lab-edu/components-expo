import type { RecommendPlaceResponse } from '@/components/selectbox/types/type';

export default function RecommendPlace({
  itemTitle,
  image,
  description,
}: Omit<RecommendPlaceResponse['items'][number], 'itemId'>) {
  return (
    <>
      <img
        src={image || 'https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg'}
        alt={`${itemTitle} image`}
        className="w-12 object-cover mr-2"
      />
      <p className="flex flex-col ml-2">
        <span>{itemTitle}</span>
        <span>{description}</span>
      </p>
    </>
  );
}
