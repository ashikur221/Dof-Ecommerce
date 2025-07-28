import React, { useState } from 'react';
import { FaHome, FaUser, FaChartBar, FaCog, FaBars } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../lib/data/Assets';
import { BiLogOut } from 'react-icons/bi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/')
    toast.success('Logout successful');
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#22404B] text-white p-2 rounded"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`bg-[#22404B] text-white w-64 min-h-screen p-6 space-y-6 fixed top-0 left-0 z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
      >
        <Link to={'/'}>
          <div className="flex flex-col items-center">
            <img src={assets.logo} className='w-16' alt="" />
            <p className="text-2xl font-semibold">MozumderShop</p>
          </div>
        </Link>
        <nav className="space-y-4 text-lg">
          <Link to="/dashboard/all-orders" className="flex items-center gap-3 hover:text-orange-400">
            <FaHome /> All Orders
          </Link>

          <Link to="/dashboard/product-list" className="flex items-center gap-3 hover:text-orange-400">
            <FaHome /> All Products
          </Link>

         
          <div onClick={logout} className="flex cursor-pointer items-center gap-3 hover:text-orange-400">
            <BiLogOut /> Logout
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
