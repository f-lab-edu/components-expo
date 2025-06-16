import CarouselContainer from '@/components/carousel/custom-carousel/CarouselContainer';
import type { CarouselOptions } from '@/components/carousel/custom-carousel/types';

type MyCarouselProps = {
  children: React.ReactNode;
};

export default function MyCarousel({ children }: MyCarouselProps) {
  const settings: CarouselOptions = {
    slidesToShow: 6,
    slidesToScroll: 5,
    draggable: true,
    swipeable: true,
    infinite: true,
    autoPlay: false,
    prevArrow: (
      <div className="flex justify-center items-center bg-gray-400 px-2 py-4 rounded-md" />
    ),
    nextArrow: (
      <div className="flex justify-center items-center bg-gray-400 px-2 py-4 rounded-md" />
    ),
  };

  return <CarouselContainer options={settings}>{children}</CarouselContainer>;
}
