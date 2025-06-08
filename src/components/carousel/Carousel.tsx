import Slider, { type Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type CarouselProps = {
  children: React.ReactNode;
};

export default function Carousel({ children }: CarouselProps) {
  const settings: Settings = {
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    centerMode: true,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}
