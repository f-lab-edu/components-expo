import Slider, { type Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CarouselArrow from '@/components/button/CarouselArrow';

type CarouselProps = {
  children: React.ReactNode;
};

export default function Carousel({ children }: CarouselProps) {
  const settings: Settings = {
    slidesToShow: 6,
    slidesToScroll: 5,
    draggable: true,
    infinite: true,
    prevArrow: <CarouselArrow />,
    nextArrow: <CarouselArrow />,
  };

  return (
    <div className="slider-container">
      <Slider className="w-full space-x-2" {...settings}>
        {children}
      </Slider>
    </div>
  );
}
