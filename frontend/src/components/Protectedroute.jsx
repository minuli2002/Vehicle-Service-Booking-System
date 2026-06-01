import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#05696B] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#0a1628] font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/signin" replace />;
  if (role && user.role !== role) {
    return <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/home"} replace />;
  }

  return children;
};

export default ProtectedRoute;