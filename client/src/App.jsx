import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import AuthLayout from "./layouts/AuthLayout";
import ProductSearch from "./pages/ProductSearch";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import Chat from "./chat/Chat";

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
  },
  {
    path:"/chat/:userid/:prodid",
    element: <Chat/>
  },
  {
    path:"/product/add",
    element:<AddProduct/>
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
