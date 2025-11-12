import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Products from "../pages/products/products";
import ProductDetails from "../pages/products/productDetails";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Forgetpass from "../pages/Auth/Forgetpass";
import AddExport from "../pages/Exports/AddExport";
import MyExports from "../pages/Exports/MyExports";
import MyImports from "../pages/Imports/MyImports";
import NotFound from "../pages/NotFound";
import PrivateRoute from "../components/PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
        <Route path="add-export" element={<PrivateRoute><AddExport /></PrivateRoute>} />
        <Route path="my-exports" element={<PrivateRoute><MyExports /></PrivateRoute>} />
        <Route path="my-imports" element={<PrivateRoute><MyImports /></PrivateRoute>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forget-password" element={<Forgetpass />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

