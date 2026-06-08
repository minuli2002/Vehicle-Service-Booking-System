import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";

const statusColors = {
  approved: "bg-blue-100 text-blue-700",
  completed: "bg-[#05696B]/10 text-[#05696B]",
};

const AppointmentDetailModal = ({ apt, onClose }) => {
  if (!apt) return null;
  const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-[#0a1628]">Appointment Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="space-y-3 text-sm">
          {[
            ["Booking Date", formatDate(apt.bookingDate)],
            ["Customer Name", apt.customerName],
            ["Contact Number", apt.contactNumber],
            ["Vehicle Number", apt.vehicleNumber],
            ["Service Type", apt.serviceType?.title],
            ["Appointment Date", formatDate(apt.appointmentDate)],
            ["Preferred Time", apt.preferredTime],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500 font-medium">{label}</span>
              <span className="text-[#0a1628] font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { token, API } = useAuth();
  const [stats, setStats] = useState({ pending: 0, totalBookings: 0, completed: 0 });
  const [pending, setPending] = useState([]);
  const [active, setActive] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApt, setSelectedApt] = useState(null);
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const headers = { Authorization: `Bearer ${token}` };

  const fetchAll = async () => {
    try {
      const [statsRes, pendingRes, activeRes] = await Promise.all([
        axios.get(`${API}/api/appointments/stats`, { headers }),
        axios.get(`${API}/api/appointments/pending`, { headers }),
        axios.get(`${API}/api/appointments/active`, { headers }),
      ]);
      setStats(statsRes.data);
      setPending(pendingRes.data.appointments);
      setActive(activeRes.data.appointments);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchFiltered = async () => {
    try {
      const params = new URLSearchParams();
      if (filterDate) params.append("date", filterDate);
      if (filterStatus) params.append("status", filterStatus);
      const res = await axios.get(`${API}/api/appointments/active?${params}`, { headers });
      setActive(res.data.appointments);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFiltered();
  }, [filterDate, filterStatus]);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`${API}/api/appointments/${id}/status`, { status: "approved" }, { headers });
      fetchAll();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`${API}/api/appointments/${id}/status`, { status: "rejected" }, { headers });
      fetchAll();
    } catch (err) {
      console.error(err);
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.patch(`${API}/api/appointments/${id}/status`, { status: "completed" }, { headers });
      fetchAll();
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const statCards = [
    {
      title: "Pending",
      value: stats.pending,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          {/* Overview */}
          <h1 className="text-3xl font-extrabold text-[#0a1628] mb-8">Overview</h1>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {statCards.map((c) => (
              <div
                key={c.title}
                className="bg-gray-50 border-2 border-[#0a1628]/20 rounded-2xl p-6 flex items-center gap-4 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0a1628]/5 flex items-center justify-center text-[#0a1628]">
                  {c.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">{c.title}</p>
                  <p className="text-3xl font-extrabold text-[#0a1628]">{c.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pending Appointments */}
          <h2 className="text-xl font-bold text-[#0a1628] mb-5">Pending Service Appointments</h2>

          {loading ? (
            <div className="flex justify-center items-center h-24">
              <div className="w-8 h-8 border-4 border-[#05696B] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : pending.length === 0 ? (
            <div className="text-center py-8 text-gray-400 bg-white rounded-xl border border-gray-100 mb-8">
              No pending appointments.
            </div>
          ) : (
            <div className="space-y-3 mb-10">
              {pending.map((apt) => (
                <div
                  key={apt._id}
                  className="bg-white border border-gray-100 rounded-xl px-5 py-4 flex items-center gap-4 shadow-sm"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-full bg-[#05696B]/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#05696B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>

                  {/* Service Info */}
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-[#0a1628] text-sm">
                      {apt.serviceType?.title || "Service"}
                    </span>
                    <span className="mx-2 text-gray-300">|</span>
                    <div className="inline-flex flex-col gap-0.5 align-top">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <svg className="w-3.5 h-3.5 text-[#05696B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(apt.appointmentDate)}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <svg className="w-3.5 h-3.5 text-[#05696B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {apt.preferredTime}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Eye */}
                    <button
                      onClick={() => setSelectedApt(apt)}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition"
                      title="View details"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>

                    {/* Approve */}
                    <button
                      onClick={() => handleApprove(apt._id)}
                      className="bg-[#05696B] text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#044f51] transition"
                    >
                      Approve
                    </button>

                    {/* Reject */}
                    <button
                      onClick={() => handleReject(apt._id)}
                      className="bg-red-50 text-red-600 border border-red-200 px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Active Maintenance Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-[#0a1628]">Active Maintenance Schedule</h2>
              {/* Filters */}
              <div className="flex items-center gap-3">
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#05696B]"
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#05696B] bg-white"
                >
                  <option value="">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="completed">Completed</option>
                </select>
                {(filterDate || filterStatus) && (
                  <button
                    onClick={() => { setFilterDate(""); setFilterStatus(""); }}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <tr>
                    {["Vehicle No", "Customer Name", "Contact No", "Service Type", "Date", "Time", "Status", "Action"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {active.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                        No active appointments.
                      </td>
                    </tr>
                  ) : (
                    active.map((apt) => (
                      <tr key={apt._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-[#0a1628]">{apt.vehicleNumber}</td>
                        <td className="px-4 py-3">{apt.customerName}</td>
                        <td className="px-4 py-3">{apt.contactNumber}</td>
                        <td className="px-4 py-3 font-medium">{apt.serviceType?.title}</td>
                        <td className="px-4 py-3">{formatDate(apt.appointmentDate)}</td>
                        <td className="px-4 py-3">{apt.preferredTime}</td>
                        <td className="px-4 py-3">
                          {apt.status === "completed" ? (
                            <span className="bg-[#05696B]/10 text-[#05696B] text-xs font-semibold px-2.5 py-1 rounded-full border border-[#05696B]/20">
                              Completed
                            </span>
                          ) : (
                            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                              In-Progress
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleComplete(apt._id)}
                            disabled={apt.status === "completed"}
                            className="bg-[#0a1628] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#05696B] transition disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            Mark as Completed
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      {selectedApt && (
        <AppointmentDetailModal apt={selectedApt} onClose={() => setSelectedApt(null)} />
      )}
    </div>
  );
};

export default AdminDashboard;