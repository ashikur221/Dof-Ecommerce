import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { assets } from '../../../../lib/data/Assets';

const HomeBanner = () => {
  return (
    <div>
      <div className="lg:w-10/12 my-5 mx-auto flex justify-center gap-5">
        <div className="w-full  ">
          <img src={assets.banner} className='rounded-2xl w-full' alt="" />

        </div>
     
      </div>
    </div>
  );
};

export default HomeBanner;