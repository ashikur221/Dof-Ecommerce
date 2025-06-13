import React from 'react';
import HomeBanner from './homeComponents/HomeBanner';
import KeyPoints from './homeComponents/KeyPoints';
import PopularCategory from './homeComponents/PopularCategory';
import PopularProduct from './homeComponents/PopularProduct';
import HotDeals from './homeComponents/HotDeals';
import SaleSection from './homeComponents/SaleSection';
import LatestNews from './homeComponents/LatestNews';
import Testimonial from './homeComponents/Testimonial';
import SocialSection from './homeComponents/SocialSection';
import DofCard from './homeComponents/DofCard';
import OrderForm from '../../../components/OrderForm';
import VideoGallary from './homeComponents/VideoGallary';
import ReviewSlider from '../../../components/ReviewSlider';

const HomePage = () => {
  return (
    <div>
      <HomeBanner />
      <KeyPoints />
      <DofCard />
      <VideoGallary/>
      <OrderForm />
      <ReviewSlider/>
      
    </div>
  );
};

export default HomePage;