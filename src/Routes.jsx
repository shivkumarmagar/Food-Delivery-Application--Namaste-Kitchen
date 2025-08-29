import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Home from './pages/home';
import RestaurantProfileMenu from './pages/restaurant-profile-menu';
import ShoppingCartCheckout from './pages/shopping-cart-checkout';
import RestaurantDashboard from './pages/restaurant-dashboard';
import OrderTrackingStatus from './pages/order-tracking-status';
import UserProfileAccountManagement from './pages/user-profile-account-management';
import UserRegistrationLogin from './pages/user-registration-login';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Home />} />
        <Route path="/restaurant-profile-menu" element={<RestaurantProfileMenu />} />
        <Route path="/shopping-cart-checkout" element={<ShoppingCartCheckout />} />
        <Route path="/restaurant-dashboard" element={<RestaurantDashboard />} />
        <Route path="/order-tracking-status" element={<OrderTrackingStatus />} />
        <Route path="/user-profile-account-management" element={<UserProfileAccountManagement />} />
        <Route path="/user-registration-login" element={<UserRegistrationLogin />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;