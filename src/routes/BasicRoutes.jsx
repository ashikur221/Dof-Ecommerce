import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import HomePage from "../pages/client/homePage/HomePage";
import ProductDetails from "../pages/client/homePage/ProductDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import AllOrders from "../pages/admin/AllOrders";
import AuthPage from "../pages/auth/AuthPage";
import Unauthorized from "../pages/auth/Unauthorized";
import PrivateRoute from "./PrivateRoute";
import UploadProduct from "../pages/admin/UploadProduct";

const router = createBrowserRouter([
  // customer layout 
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

  // dashboard layout 
  {
    path: '/dashboard',
    element: <PrivateRoute allowedRoles={['super-admin']}>
      <DashboardLayout />
    </PrivateRoute>,
    children: [
      {
        path: '/dashboard',
        element: <div>Dashboard</div>
      },
      {
        path: 'all-orders',
        element: <AllOrders />
      },
      {
        path: 'upload-product',
        element: <UploadProduct />
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthPage />
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />
  }


])

export default router;