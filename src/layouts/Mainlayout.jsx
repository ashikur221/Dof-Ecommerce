import React from 'react';
import Topbar from '../components/Topbar';
import { Outlet } from 'react-router-dom';
import MainFooter from '../components/MainFooter';
import Navbar from '../components/MainNavbar';


const Mainlayout = () => {
  return (
    <div>
      <Topbar />
      <Navbar/>
      <Outlet></Outlet>
      <MainFooter/>
    </div>
  );
};

export default Mainlayout;