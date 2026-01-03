import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home/Home";
import Products from "../pages/products/products";
import ProductDetails from "../pages/products/productDetails";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Forgetpass from "../pages/Auth/Forgetpass";
import AddExport from "../pages/Exports/AddExport";
import MyExports from "../pages/Exports/MyExports";
import MyImports from "../pages/Imports/MyImports";
import DashboardOverview from "../pages/Dashboard/DashboardOverview";
import Profile from "../pages/Dashboard/Profile";
import NotFound from "../pages/NotFound";
import PrivateRoute from "../components/PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forget-password" element={<Forgetpass />} />
      </Route>

      {/* Dashboard Routes */}
      <Route path="/" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
        <Route path="dashboard" element={<DashboardOverview />} />
        <Route path="add-export" element={<AddExport />} />
        <Route path="my-exports" element={<MyExports />} />
        <Route path="my-imports" element={<MyImports />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}


