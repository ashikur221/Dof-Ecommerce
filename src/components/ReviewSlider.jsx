import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { assets } from '../lib/data/Assets';

const reviews = [
  {
    name: 'John Doe',
    title: 'Satisfied Customer',
    message: 'Amazing product quality and fast delivery! I highly recommend this store.',
    image: assets.review1
  },
  {
    name: 'Sarah Smith',
    title: 'Happy Buyer',
    message: 'Great service and communication throughout the process.',
    image: assets.review2
  },
  {
    name: 'Ali Khan',
    title: 'Frequent Buyer',
    message: 'I’ve ordered multiple times, and it never disappoints!',
    image: assets.review3
  },
];

const ReviewSlider = () => {
  return (
    <div className="w-11/12 max-w-4xl mx-auto py-10">
      <h2 className="text-3xl font-bold text-center uppercase text-[#f59121] mb-8">What Our Customers Say</h2>

      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={20}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="pb-10"
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-lg p-6 text-center max-w-xl mx-auto">
              <img
                src={review.image}
                alt={review.name}
                className=" mx-auto mb-4 border-4 border-orange-300"
              />
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
