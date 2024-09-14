import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./NewsTicker.css";
import { Autoplay } from "swiper/modules";

const NewsTicker = ({ images }: { images: string[] }) => {
  return (
    <div className="news-ticker-container">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10} // المسافة بين الصور
        slidesPerView={1} // عرض عدد تلقائي من الصور في العرض
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 40,
          },
        }}
        className="news-ticker-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="news-ticker-slide">
            <img
              src={image}
              alt={`Institution ${index + 1}`}
              className="news-ticker-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsTicker;
