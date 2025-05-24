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

const HomePage = () => {
  return (
    <div>
      <HomeBanner />
      <KeyPoints />
      <DofCard />
      <OrderForm/>
      
    </div>
  );
};

export default HomePage;