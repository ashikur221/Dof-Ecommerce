import React from 'react';
import toast from 'react-hot-toast';
import { FaAngleDown, FaFacebook, FaPhone, FaYoutube } from 'react-icons/fa';
import { FiMapPin } from 'react-icons/fi';
import { MdEmail, MdPhone } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

const Topbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/')
    toast.success('Logout successful');
  }

  return (
    <div className="border-b py-2 bg-[#f59121]">
      <div className='w-10/12 mx-auto'>
        <div className="lg:flex text-center lg:justify-between text-xs text-white">
          <div className="flex items-center gap-2">
            <MdPhone />
            <p className="">(+088) 1813387605</p>
            <p className="flex items-center gap-2"><MdEmail />info@mozumdershopbd.com</p>
          </div>
          {/* <div className="flex justify-center items-center gap-3">
            <p className='flex items-center'>Eng<FaAngleDown /></p>
            <p className='flex items-center'>USD<FaAngleDown /></p>
            <p>Sign In / Sign Up</p>
          </div> */}
          <div className="text-xl flex items-center gap-3">
            <Link to={'https://www.facebook.com/share/1C1p37CKr8/'} target='_blank'>
              <FaFacebook />
            </Link>

            {
              token ?

                <p onClick={() => logout()} className="text-sm cursor-pointer">Logout</p>
                :
                <Link to={'/auth'} >
                  <p className="text-sm">Login/Register</p>
                </Link>
            }

          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;