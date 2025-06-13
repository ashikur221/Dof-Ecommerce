import React, { useState } from 'react';
import { FaHome, FaUser, FaChartBar, FaCog, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

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
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav className="space-y-4 text-lg">
          <Link to="/dashboard/all-orders" className="flex items-center gap-3 hover:text-orange-400">
            <FaHome /> All Orders
          </Link>
          <a href="#" className="flex items-center gap-3 hover:text-orange-400">
            <FaUser /> Profile
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-orange-400">
            <FaChartBar /> Analytics
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-orange-400">
            <FaCog /> Settings
          </a>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
