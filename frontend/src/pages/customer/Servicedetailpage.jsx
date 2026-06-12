import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";

const featureCards = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    title: "Deep Diagnostics",
    desc: "Full ECU scanning and sensor analysis to find hidden malfunctions before they become costly repairs.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Precision Tooling",
    desc: "Using only manufacturer-approved specialized tools for intricate disassembly and recalibration.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "OEM Parts",
    desc: "We source genuine Original Equipment Manufacturer parts to guarantee compatibility and durability.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Warranty Backed",
    desc: "All engine repairs come with our 12-month/12,000-mile comprehensive service warranty.",
  },
];

const ServiceDetailPage = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const { API } = useAuth();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`${API}/api/services/${id}`);
        setService(res.data.service);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id, API]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#05696B] border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!service)
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center text-gray-500">Service not found.</div>
        <Footer />
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-10 mb-12">
          {/* Left: Image + Info */}
          <div className="flex-1">
            {/* Large Image */}
            <div className="rounded-2xl overflow-hidden mb-6 h-72 bg-gray-100">
              {service.image ? (
                <img
                  src={`${API}${service.image}`}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50">
                  <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Title & Description */}
            <h1 className="text-3xl font-extrabold text-[#0a1628] mb-4">{service.title}</h1>
            <p className="text-gray-600 leading-relaxed text-sm line-clamp-4">{service.description}</p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {featureCards.map((fc) => (
                <div key={fc.title} className="bg-[#e8f4f4] rounded-xl p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-[#05696B] font-bold text-sm">
                    {fc.icon}
                    {fc.title}
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed">{fc.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Service Summary Card */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="border-2 border-[#0a1628] rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-[#0a1628] mb-4">Service Summary</h2>
              <p className="text-sm text-gray-500 mb-1">Base starting at:</p>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-sm text-gray-600">Rs.</span>
                <span className="text-3xl font-extrabold text-[#05696B]">
                  {service.basicCost.toLocaleString()}
                </span>
              </div>
              <Link
                to="/book-service"
                state={{ serviceId: service._id }}
                className="block w-full bg-[#0a1628] text-white py-3 rounded-xl text-center font-semibold text-sm hover:bg-[#05696B] transition-colors duration-200 mb-4"
              >
                Book This Service
              </Link>
              <p className="text-xs text-gray-400 italic leading-relaxed">
                *Final pricing may vary based on vehicle model and part requirements.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetailPage;