import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      <main className="flex-1 max-w-2xl mx-auto px-6 py-12 w-full">
        <h1 className="text-3xl font-extrabold text-[#0a1628] mb-8">My Profile</h1>

        <div className="border border-gray-200 rounded-2xl shadow-md p-8">
          {/* Avatar */}
          <div className="flex items-center gap-5 mb-8">
            <div className="w-20 h-20 rounded-full bg-[#0a1628] flex items-center justify-center text-white text-3xl font-bold">
              {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0a1628]">{user?.fullName}</h2>
              <span className="text-xs bg-[#05696B]/10 text-[#05696B] font-semibold px-3 py-1 rounded-full capitalize mt-1 inline-block">
                {user?.role}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                label: "Full Name",
                value: user?.fullName,
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                ),
              },
              {
                label: "Email",
                value: user?.email,
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                label: "Phone",
                value: user?.phone,
                icon: (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ),
              },
            ].map((field) => (
              <div key={field.label} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <span className="text-[#05696B] mt-0.5">{field.icon}</span>
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-0.5">{field.label}</p>
                  <p className="text-sm font-semibold text-[#0a1628]">{field.value || "—"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;