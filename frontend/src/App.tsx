
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import MainLayout from "@/components/Layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Settings from "./pages/Settings";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Redirect root to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Public routes */}
              <Route path="/login" element={<Login />} />

              {/* Protected routes */}
              <Route path="/" element={
                 <ProtectedRoute>
                  <MainLayout />
                 </ProtectedRoute>
              }>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="assets" element={<Assets />} />
                <Route path="settings" element={<Settings />} />
                
                {/* Placeholder pages */}
                <Route path="booking" element={<PlaceholderPage title="Booking" />} />
                <Route path="sell-cars" element={<PlaceholderPage title="Sell Cars" />} />
                <Route path="buy-cars" element={<PlaceholderPage title="Buy Cars" />} />
                <Route path="services" element={<PlaceholderPage title="Services" />} />
                <Route path="calendar" element={<PlaceholderPage title="Calendar" />} />
                <Route path="messages" element={<PlaceholderPage title="Messages" />} />

                {/* Logout route */}
                <Route path="logout" element={<Navigate to="/login" replace />} />
              </Route>

              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
