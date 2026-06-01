import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";

const BookServicePage = () => {
  const { user, token, API } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const preSelectedService = location.state?.serviceId || "";

  const today = new Date().toISOString().split("T")[0];

  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    customerName: user?.fullName || "",
    contactNumber: "",
    vehicleNumber: "",
    serviceType: preSelectedService,
    appointmentDate: "",
    preferredTime: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API}/api/services`);
        setServices(res.data.services);
      } catch (err) {
        console.error(err);
      }
    };
    fetchServices();
  }, [API]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.customerName ||
      !form.contactNumber ||
      !form.vehicleNumber ||
      !form.serviceType ||
      !form.appointmentDate ||
      !form.preferredTime
    ) {
      return setError("All fields are required.");
    }

    if (!/^\d{10}$/.test(form.contactNumber)) {
      return setError("Contact number must be exactly 10 digits.");
    }

    setLoading(true);
    try {
      await axios.post(`${API}/api/appointments`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess(true);
      setTimeout(() => {
        navigate("/my-bookings");
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Content */}
          <div className="flex-1 pt-4">
            <h1 className="text-3xl font-extrabold text-[#0a1628] leading-tight mb-4">
              Book Your Vehicle&apos;s<br />Next Expert Service
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md">
              Professional care tailored for every ride. Ensure your vehicle stays in peak
              performance with our certified technician network and real-time scheduling.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: "🛡️", text: "100% Certified Technicians" },
                { icon: "⚡", text: "Same-day booking confirmation" },
                { icon: "📋", text: "Transparent pricing, no surprises" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-xl">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-[480px]">
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6 flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-semibold">Booking Confirmed!</p>
                  <p className="text-xs mt-0.5">Redirecting to your bookings...</p>
                </div>
              </div>
            )}

            <div className="border border-gray-200 rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-[#0a1628] mb-6">Service Request</h2>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Date (readonly) */}
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1">Date</label>
                  <input
                    type="date"
                    value={today}
                    readOnly
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 cursor-not-allowed"
                  />
                </div>

                {/* Customer Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1">Customer Name</label>
                  <input
                    type="text"
                    name="customerName"
                    value={form.customerName}
                    onChange={(e) => {
                      if (/^[a-zA-Z\s]*$/.test(e.target.value)) handleChange(e);
                    }}
                    placeholder="Full name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#05696B] transition"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1">Contact Number</label>
                  <input
                    type="tel"
                    name="contactNumber"
                    value={form.contactNumber}
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) handleChange(e);
                    }}
                    placeholder="10-digit number"
                    maxLength={10}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#05696B] transition"
                  />
                </div>

                {/* Vehicle Number */}
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1">Vehicle Number</label>
                  <input
                    type="text"
                    name="vehicleNumber"
                    value={form.vehicleNumber}
                    onChange={handleChange}
                    placeholder="e.g. ABC-1234"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#05696B] transition"
                  />
                </div>

                {/* Service Type */}
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1">Service Type</label>
                  <select
                    name="serviceType"
                    value={form.serviceType}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#05696B] transition bg-white"
                  >
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s._id} value={s._id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Appointment Date */}
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1">Appointment Date</label>
                  <input
                    type="date"
                    name="appointmentDate"
                    value={form.appointmentDate}
                    min={today}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#05696B] transition"
                  />
                </div>

                {/* Preferred Time */}
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1">Preferred Time</label>
                  <input
                    type="time"
                    name="preferredTime"
                    value={form.preferredTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#05696B] transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || success}
                  className="w-full bg-[#0a1628] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#05696B] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Placing Booking...
                    </span>
                  ) : (
                    "Place Booking"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookServicePage;