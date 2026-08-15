import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../pages/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Category from "../pages/Category";
import Products from "../pages/Products";

const AppRoutes = () => {
  return (
    <RouterRoutes>
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="category" element={<Category />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </RouterRoutes>
  );
};

export default AppRoutes;
