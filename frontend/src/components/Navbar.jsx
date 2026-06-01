import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <nav className="bg-[#0a1628] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="text-2xl font-extrabold text-white tracking-tight">
          Auto<span className="text-[#05696B]">Ease</span>
        </Link>

        {/* Center Nav Links */}
        <div className="flex items-center gap-8">
          <Link
            to="/home"
            className={`text-sm font-semibold tracking-wide transition-colors duration-200 ${
              isActive("/home")
                ? "text-[#05696B] border-b-2 border-[#05696B] pb-0.5"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Home
          </Link>
          <Link
            to="/services"
            className={`text-sm font-semibold tracking-wide transition-colors duration-200 ${
              isActive("/services")
                ? "text-[#05696B] border-b-2 border-[#05696B] pb-0.5"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Services
          </Link>
          <Link
            to="/my-bookings"
            className={`text-sm font-semibold tracking-wide transition-colors duration-200 ${
              isActive("/my-bookings")
                ? "text-[#05696B] border-b-2 border-[#05696B] pb-0.5"
                : "text-gray-300 hover:text-white"
            }`}
          >
            Appointments
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/book-service"
            className="bg-[#05696B] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#044f51] transition-colors duration-200"
          >
            Book Now
          </Link>
          <Link
            to="/profile"
            className="w-9 h-9 rounded-full bg-[#05696B]/20 border border-[#05696B]/40 flex items-center justify-center hover:bg-[#05696B]/30 transition-colors duration-200"
            title="Profile"
          >
            <svg className="w-5 h-5 text-[#05696B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
            title="Logout"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;