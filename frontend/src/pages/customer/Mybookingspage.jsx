import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";

const statusConfig = {
  pending: { label: "Pending", classes: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  approved: { label: "Approved", classes: "bg-blue-100 text-blue-700 border-blue-200" },
  rejected: { label: "Rejected", classes: "bg-red-100 text-red-700 border-red-200" },
  completed: { label: "Completed", classes: "bg-[#05696B]/10 text-[#05696B] border-[#05696B]/20" },
};

const MyBookingsPage = () => {
  const { token, API } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${API}/api/appointments/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAppointments(res.data.appointments);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [token, API]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full">
        <h1 className="text-3xl font-extrabold text-[#0a1628] mb-2">My Bookings</h1>
        <p className="text-gray-500 text-sm mb-8">Track and manage all your vehicle service appointments.</p>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-10 h-10 border-4 border-[#05696B] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="font-semibold text-lg">No bookings yet.</p>
            <p className="text-sm mt-1">Book your first service appointment to see it here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((apt) => {
              const status = statusConfig[apt.status] || statusConfig.pending;
              return (
                <div
                  key={apt._id}
                  className="border border-gray-100 rounded-2xl px-6 py-5 shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-between gap-4"
                >
                  {/* Left: Info */}
                  <div className="flex flex-col gap-1 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-[#0a1628] text-base">
                        {apt.serviceType?.title || "Service"}
                      </span>
                      <span className="text-xs text-gray-400 font-normal">
                        Booked on {formatDate(apt.bookingDate)}
                      </span>
                    </div>

                    <div className="flex items-center gap-5 mt-1">
                      {/* Date */}
                      <span className="flex items-center gap-1.5 text-sm text-gray-500">
                        <svg className="w-4 h-4 text-[#05696B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(apt.appointmentDate)}
                      </span>

                      {/* Time */}
                      <span className="flex items-center gap-1.5 text-sm text-gray-500">
                        <svg className="w-4 h-4 text-[#05696B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {apt.preferredTime}
                      </span>
                    </div>
                  </div>

                  {/* Right: Status Badge */}
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${status.classes} flex-shrink-0`}
                  >
                    {status.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default MyBookingsPage;