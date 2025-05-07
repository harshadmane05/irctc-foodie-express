
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public pages
import Index from "./pages/Index";
import RestaurantList from "./pages/RestaurantList";
import RestaurantDetails from "./pages/RestaurantDetails";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Help from "./pages/Help";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import TrackOrder from "./pages/TrackOrder";
import FeedbackForm from "./pages/FeedbackForm";

// Passenger dashboard pages
import PassengerDashboard from "./pages/passenger/Dashboard";

// Vendor dashboard pages
import VendorDashboard from "./pages/vendor/Dashboard";
import ManageMenu from "./pages/vendor/ManageMenu";
import ProcessOrders from "./pages/vendor/ProcessOrders";
import UpdateStatus from "./pages/vendor/UpdateStatus";

// Auth provider
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
          <Toaster />
          <Sonner position="top-right" closeButton richColors />
          <BrowserRouter>
            <div className="animate-fade-in">
              <Routes>
                {/* Public Routes - No authentication required */}
                <Route path="/" element={<Index />} />
                <Route path="/restaurants" element={<RestaurantList />} />
                <Route path="/restaurant/:id" element={<RestaurantDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/help" element={<Help />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/feedback" element={<FeedbackForm />} />

                {/* Protected Routes - Authentication required at checkout */}
                <Route path="/order-success" element={
                  <ProtectedRoute requireAuth={true}>
                    <OrderSuccess />
                  </ProtectedRoute>
                } />

                {/* Passenger Dashboard Routes */}
                <Route path="/passenger" element={
                  <ProtectedRoute role="passenger">
                    <PassengerDashboard />
                  </ProtectedRoute>
                } />

                {/* Vendor Dashboard Routes */}
                <Route path="/vendor" element={
                  <ProtectedRoute role="vendor">
                    <VendorDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/vendor/menu" element={
                  <ProtectedRoute role="vendor">
                    <ManageMenu />
                  </ProtectedRoute>
                } />
                <Route path="/vendor/orders" element={
                  <ProtectedRoute role="vendor">
                    <ProcessOrders />
                  </ProtectedRoute>
                } />
                <Route path="/vendor/status" element={
                  <ProtectedRoute role="vendor">
                    <UpdateStatus />
                  </ProtectedRoute>
                } />

                {/* Catch-all Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
