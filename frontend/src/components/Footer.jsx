import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0a1628] text-gray-400 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-2xl font-extrabold text-white">
              Auto<span className="text-[#05696B]">Ease</span>
            </span>
            <p className="text-sm text-gray-500">Expert Vehicle Care, Seamlessly Booked.</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/privacy-policy" className="hover:text-[#05696B] transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="hover:text-[#05696B] transition-colors duration-200">
              Terms of Service
            </Link>
            <Link to="/contact-support" className="hover:text-[#05696B] transition-colors duration-200">
              Contact Support
            </Link>
            <Link to="/about-us" className="hover:text-[#05696B] transition-colors duration-200">
              About Us
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} AutoEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;