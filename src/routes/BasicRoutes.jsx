import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import HomePage from "../pages/client/homePage/HomePage";
import ProductDetails from "../pages/client/homePage/ProductDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import AllOrders from "../pages/admin/AllOrders";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: "/dof/:id",
        element: <ProductDetails />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '/dashboard',
        element: <div>Dashboard</div>
      },
      {
        path: 'all-orders',
        element: <AllOrders/>
      }
    ]
  }


])

export default router;