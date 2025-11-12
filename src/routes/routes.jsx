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
        <Route path="*" element={<div className='min-h-[50vh] grid place-items-center text-center'><div><h2 className='text-2xl font-semibold'>Page Not Found</h2><a className='btn btn-primary mt-4' href='/'>Go Home</a></div></div>} />
      </Route>
    </Routes>
  );
}

