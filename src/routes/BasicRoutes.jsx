import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import HomePage from "../pages/client/homePage/HomePage";
import ProductDetails from "../pages/client/homePage/ProductDetails";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Mainlayout />,
    children: [
      {
        path: '/',
        element: <HomePage/>
      },
      {
        path:"/dof/:id",
        element: <ProductDetails/>
      }
    ]
  }
])

export default router;