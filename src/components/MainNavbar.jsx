import React from 'react';
import { CiHeart, CiSearch } from 'react-icons/ci';
import { IoBagHandleOutline } from 'react-icons/io5';
import MainLink from './MainLink';
import logo from './../assets/images/logo.jpg';

const MainNavbar = () => {
  return (
    <div className="">
      <div className='w-10/12 mx-auto  py-3'>
        <div className="flex flex-col gap-1 lg:flex-row items-center lg:justify-center">

          <div className="hidden lg:flex items-center gap-2">
            <div className="">
              <img src={logo} alt="" className='w-16 h-16'/>
            </div>
            <p className="text-3xl font-semibold">MozumderShopBd</p>
          </div>

       

          <div className="text-3xl flex items-center justify-center ">
            <div className="border-r px-4">
              <CiHeart />
            </div>
            <div className="px-4 flex">
              <IoBagHandleOutline />

            </div>

            
          </div>

        </div>
      </div>

      <div className="">
        <MainLink/> 
      </div>
    </div>
  );
};

export default MainNavbar;