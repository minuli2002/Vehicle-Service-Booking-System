import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";

const ServiceDetailModal = ({ service, onClose, API }) => {
  if (!service) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[#0a1628]">Service Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {service.image && (
          <img src={`${API}${service.image}`} alt={service.title} className="w-full h-40 object-cover rounded-xl mb-4" />
        )}
        <div className="space-y-3 text-sm">
          {[
            ["Title", service.title],
            ["Description", service.description],
            ["Average Time", service.averageTime],
            ["Basic Cost", `Rs. ${service.basicCost?.toLocaleString()}`],
          ].map(([label, value]) => (
            <div key={label} className="border-b border-gray-100 pb-2">
              <p className="text-xs text-gray-500 font-medium">{label}</p>
              <p className="text-[#0a1628] font-semibold mt-0.5">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdminManageServices = () => {
  const { token, API } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  const headers = { Authorization: `Bearer ${token}` };

  const fetchServices = async () => {
    try {
      const res = await axios.get(`${API}/api/services`);
      setServices(res.data.services);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this service? This action cannot be undone.")) return;
    try {
      await axios.delete(`${API}/api/services/${id}`, { headers });
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-[#0a1628]">Manage Services</h1>
            <Link
              to="/admin/add-service"
              className="bg-[#0a1628] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#05696B] transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Service
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="w-10 h-10 border-4 border-[#05696B] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg font-semibold">No services added yet.</p>
              <p className="text-sm mt-1">Click &quot;Add Service&quot; to get started.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service._id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col">
                  {/* Image */}
                  <div className="relative h-44 bg-gray-100 overflow-hidden">
                    {service.image ? (
                      <img src={`${API}${service.image}`} alt={service.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50">
                        <svg className="w-14 h-14 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}

                    {/* Action icons */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedService(service)}
                        className="w-7 h-7 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center text-gray-600 hover:text-[#0a1628] shadow-sm transition"
                        title="View"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <Link
                        to={`/admin/edit-service/${service._id}`}
                        className="w-7 h-7 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center text-gray-600 hover:text-blue-600 shadow-sm transition"
                        title="Edit"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="w-7 h-7 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center text-gray-600 hover:text-red-600 shadow-sm transition"
                        title="Delete"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-[#0a1628] text-base mb-3">{service.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#05696B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {service.averageTime}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-[#05696B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Rs. {service.basicCost?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>

        <Footer />
      </div>

      {selectedService && (
        <ServiceDetailModal service={selectedService} onClose={() => setSelectedService(null)} API={API} />
      )}
    </div>
  );
};

export default AdminManageServices;