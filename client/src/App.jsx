import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import AuthLayout from "./layouts/AuthLayout";
import ProductSearch from "./pages/ProductSearch";
import Product from "./pages/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
    ],
  },
  {
    path:"/search",
    element: <ProductSearch/>
  },
  {
    path:"/product/:id",
    element:<Product/>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
