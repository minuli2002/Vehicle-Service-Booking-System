import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth pages
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";

// Customer pages
import HomePage from "./pages/customer/HomePage";
import ServicesPage from "./pages/customer/ServicesPage";
import ServiceDetailPage from "./pages/customer/ServiceDetailPage";
import BookServicePage from "./pages/customer/BookServicePage";
import MyBookingsPage from "./pages/customer/MyBookingsPage";
import ProfilePage from "./pages/customer/ProfilePage";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminManageServices from "./pages/admin/AdminManageServices";
import AddServicePage from "./pages/admin/AddServicePage";
import EditServicePage from "./pages/admin/EditServicePage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Default redirect to signup */}
          <Route path="/" element={<Navigate to="/signup" replace />} />

          {/* Auth routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Customer routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute role="customer">
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services"
            element={
              <ProtectedRoute role="customer">
                <ServicesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/:id"
            element={
              <ProtectedRoute role="customer">
                <ServiceDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/book-service"
            element={
              <ProtectedRoute role="customer">
                <BookServicePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute role="customer">
                <MyBookingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute role="customer">
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manage-services"
            element={
              <ProtectedRoute role="admin">
                <AdminManageServices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-service"
            element={
              <ProtectedRoute role="admin">
                <AddServicePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-service/:id"
            element={
              <ProtectedRoute role="admin">
                <EditServicePage />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/signup" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;