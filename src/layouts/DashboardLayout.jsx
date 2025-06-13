import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/backend/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-0 md:ml-64 flex-1 bg-gray-100 min-h-screen">
        {/* Optional Header */}
        <header className="bg-white p-4 shadow sticky top-0 z-10">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        </header>

        {/* Render child routes here */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
