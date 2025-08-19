import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";

// Import all page components
import FabricCatalogBrowse from "./pages/fabric-catalog-browse";
import DesignerDirectoryProfiles from "./pages/designer-directory-profiles";
import VendorDashboardInventory from "./pages/vendor-dashboard-inventory";
import FabricProductDetail from "./pages/fabric-product-detail";
import ShoppingCartCheckout from "./pages/shopping-cart-checkout";
import OrderManagementDashboard from "./pages/order-management-dashboard";
import AdminControlPanel from "./pages/admin-control-panel";
import LoginRegistration from "./pages/login-registration";
import NotFound from "./pages/NotFound";

const Routes = () => {
  return (
    <RouterRoutes>
      {/* Main application routes */}
      <Route path="/" element={<FabricCatalogBrowse />} />
      <Route path="/fabric-catalog-browse" element={<FabricCatalogBrowse />} />
      <Route path="/designer-directory-profiles" element={<DesignerDirectoryProfiles />} />
      <Route path="/fabric-product-detail" element={<FabricProductDetail />} />
      <Route path="/fabric-product-detail/:id" element={<FabricProductDetail />} />
      <Route path="/shopping-cart-checkout" element={<ShoppingCartCheckout />} />
      <Route path="/order-management-dashboard" element={<OrderManagementDashboard />} />
      <Route path="/vendor-dashboard-inventory" element={<VendorDashboardInventory />} />
      <Route path="/admin-control-panel" element={<AdminControlPanel />} />
      
      {/* Authentication routes - accessible in preview mode */}
      <Route path="/login-registration" element={<LoginRegistration />} />
      <Route path="/login" element={<LoginRegistration />} />
      <Route path="/signup" element={<LoginRegistration />} />
      
      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;