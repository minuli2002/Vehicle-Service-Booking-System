import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Certified Precision",
    desc: "Every technician is factory-certified and regularly assessed for quality excellence.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Efficiency-First",
    desc: "Our streamlined scheduling minimizes your wait and maximizes your vehicle's uptime.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Total Transparency",
    desc: "Real-time updates and clear pricing — no hidden fees, no surprises.",
  },
];

const topServices = [
  {
    icon: "🔧",
    title: "Engine Diagnostics",
    desc: "Full ECU scanning and sensor analysis to pinpoint issues before they escalate.",
  },
  {
    icon: "🛞",
    title: "Tire & Wheel Service",
    desc: "Balancing, rotation, and alignment for optimal ride quality and safety.",
  },
  {
    icon: "🛢️",
    title: "Oil & Fluid Service",
    desc: "Premium oil changes and complete fluid system checks for peak engine health.",
  },
  {
    icon: "❄️",
    title: "AC & Climate Control",
    desc: "Full refrigerant recharge and system diagnostic for all-season comfort.",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[85vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?auto=format&fit=crop&w=1920&q=80"
          alt="Vehicle service"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/85 via-[#0a1628]/50 to-transparent" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-8 max-w-xl">
            <h1 className="text-5xl font-extrabold text-white leading-tight mb-4">
              Expert Care for<br />Your Vehicle
            </h1>
            <p className="text-gray-200 text-base leading-relaxed mb-8 max-w-md">
              Experience the gold standard in automotive maintenance. Our precision-driven booking
              system connects you with certified technicians for seamless, professional care.
            </p>
            <Link
              to="/services"
              className="inline-block px-7 py-3 rounded-xl font-semibold text-white border border-white/40 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-200 text-sm"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Top Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0a1628] mb-3">Our Top Services</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Comprehensive vehicle care from certified professionals. Trusted by thousands of drivers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topServices.map((s) => (
              <div
                key={s.title}
                className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-[#05696B]/30 transition-all duration-200 group"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-[#0a1628] mb-2 text-base group-hover:text-[#05696B] transition-colors">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose AutoEase */}
      <section className="py-20 bg-[#0a1628]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-12">Why Choose AutoEase?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col items-center gap-4 p-6">
                <div className="w-16 h-16 rounded-2xl bg-[#05696B]/20 flex items-center justify-center text-[#05696B]">
                  {f.icon}
                </div>
                <h3 className="text-white font-bold text-lg">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto rounded-3xl border border-gray-200 overflow-hidden flex flex-col md:flex-row shadow-lg">
          {/* Left */}
          <div className="flex-1 p-10 flex flex-col justify-center">
            <h2 className="text-2xl font-extrabold text-[#0a1628] mb-4 leading-snug">
              Ready for your vehicle&apos;s next evolution?
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Book your professional consultation or maintenance slot in under 60 seconds with our
              streamlined portal.
            </p>
            <Link
              to="/book-service"
              className="inline-block bg-[#0a1628] text-white px-7 py-3 rounded-xl font-semibold text-sm hover:bg-[#05696B] transition-colors duration-200 w-fit"
            >
              Schedule Appointment
            </Link>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
            <img
              src="/images/cta-image.png"
              alt="Mechanic at work"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;