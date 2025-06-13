import React from 'react';
import { FaAngleDown, FaFacebook, FaPhone, FaYoutube } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { MdEmail, MdPhone } from 'react-icons/md';

const Topbar = () => {
  return (
    <div className="border-b py-2 bg-[#f59121]">
      <div className='w-10/12 mx-auto'>
        <div className="lg:flex text-center lg:justify-between text-xs text-white">
          <div className="flex items-center gap-2">
            <MdPhone />
            <p className="">(+088) 1813387605</p>
            <p className="flex items-center gap-2"><MdEmail />info@gmail.com</p>
          </div>
          {/* <div className="flex justify-center items-center gap-3">
            <p className='flex items-center'>Eng<FaAngleDown /></p>
            <p className='flex items-center'>USD<FaAngleDown /></p>
            <p>Sign In / Sign Up</p>
          </div> */}
          <div className="text-xl flex gap-3">
            <FaFacebook />
            <FaYoutube />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;