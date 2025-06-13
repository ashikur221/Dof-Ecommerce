import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { assets } from '../../../../lib/data/Assets';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const bannerImages = [
  assets.banner,
  assets.banner2,
  assets.banner3,
];

const HomeBanner = () => {
  return (
    <div className="lg:w-10/12 my-5 mx-auto">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 4000 }}
        navigation
        pagination={{ clickable: true }}
        className="rounded-2xl custom-swiper"
      >
        {bannerImages.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="rounded-2xl w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBanner;
