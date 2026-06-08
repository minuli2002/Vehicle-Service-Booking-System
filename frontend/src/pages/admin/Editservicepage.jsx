import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import Footer from "../../components/Footer";
import { useAuth } from "../../context/AuthContext";

const EditServicePage = () => {
  const { token, API } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    description: "",
    averageTime: "",
    basicCost: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`${API}/api/services/${id}`);
        const s = res.data.service;
        setForm({
          title: s.title,
          description: s.description,
          averageTime: s.averageTime,
          basicCost: s.basicCost,
        });
        if (s.image) setPreview(`${API}${s.image}`);
      } catch (err) {
        setError("Failed to load service data.");
      } finally {
        setFetching(false);
      }
    };
    fetchService();
  }, [id, API]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.title || !form.description || !form.averageTime || !form.basicCost) {
      return setError("All fields are required.");
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach((k) => formData.append(k, form[k]));
      if (image) formData.append("image", image);

      await axios.put(`${API}/api/services/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin/manage-services");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update service.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#05696B] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-extrabold text-[#0a1628] mb-8">Update Service</h1>

          <div className="max-w-2xl bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-2">Service Photo</label>
                <div
                  className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-[#05696B]/50 transition-colors"
                  onClick={() => document.getElementById("editServiceImage").click()}
                >
                  {preview ? (
                    <div className="relative">
                      <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                      <p className="text-xs text-gray-400 mt-2">Click to change image</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm font-medium">Click to upload image</p>
                      <p className="text-xs">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </div>
                <input
                  id="editServiceImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
              </div>

              {/* Service Title */}
              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-1">Service Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Engine Diagnostics"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#05696B] transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-[#0a1628] mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the service in detail..."
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#05696B] transition resize-none"
                />
              </div>

              {/* Average Time + Basic Cost */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1">Average Time</label>
                  <input
                    type="text"
                    name="averageTime"
                    value={form.averageTime}
                    onChange={handleChange}
                    placeholder="e.g. 2-3 hours"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#05696B] transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0a1628] mb-1">Basic Cost (Rs.)</label>
                  <input
                    type="text"
                    name="basicCost"
                    value={form.basicCost}
                    onChange={(e) => {
                      if (/^[\d.,]*$/.test(e.target.value)) handleChange(e);
                    }}
                    placeholder="e.g. 3500"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#05696B] transition"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#0a1628] text-white py-2.5 rounded-xl font-semibold text-sm hover:bg-[#05696B] transition-colors duration-200 disabled:opacity-60"
                >
                  {loading ? "Updating Service..." : "Update Service"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin/manage-services")}
                  className="px-6 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default EditServicePage;