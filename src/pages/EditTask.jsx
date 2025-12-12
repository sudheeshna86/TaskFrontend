import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Save, 
  Calendar, 
  AlignLeft, 
  Type, 
  Flag, 
  Activity,
  Loader2
} from "lucide-react";

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "low",
    dueDate: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // --- Fetch Data ---
  useEffect(() => {
    let cancelled = false;
    const fetchTask = async () => {
      try {
        const res = await axios.get(`/tasks/${id}`);
        if (cancelled) return;
        const task = res.data;
        setForm({
          title: task.title,
          description: task.description || "",
          status: task.status || "pending",
          priority: task.priority || "low",
          dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
        });
      } catch (err) {
        setError("Failed to load task details.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchTask();
    return () => { cancelled = true; };
  }, [id]);

  // --- Handlers ---
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const setSelection = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      const payload = {
        ...form,
        dueDate: form.dueDate || null,
      };
      await axios.put(`/tasks/${id}`, payload);
      navigate("/app/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task");
    } finally {
      setSaving(false);
    }
  };

  const priorityOptions = [
    { value: "low", label: "Low", color: "bg-teal-100 text-teal-700 border-teal-200" },
    { value: "medium", label: "Medium", color: "bg-orange-100 text-orange-700 border-orange-200" },
    { value: "high", label: "High", color: "bg-rose-100 text-rose-700 border-rose-200" },
  ];

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "inprogress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Loader2 size={40} className="text-indigo-600" />
      </motion.div>
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen flex items-center justify-center p-4 bg-gray-50/50"
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
        
        {/* Header Gradient (Different color to signify Edit mode) */}
        <div className="h-2 w-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500" />

        <div className="p-8">
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => navigate("/app/tasks")}
              className="p-2 rounded-full hover:bg-gray-100 transition text-gray-500"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Edit Task</h1>
              <p className="text-gray-500 text-sm">Update details for <span className="font-mono text-indigo-500">#{id.slice(-4)}</span></p>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                <Type size={16} className="text-teal-500"/> Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition outline-none text-lg font-medium text-gray-800"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                <AlignLeft size={16} className="text-teal-500"/> Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition outline-none text-gray-700 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Priority */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                  <Flag size={16} className="text-teal-500"/> Priority
                </label>
                <div className="flex gap-2">
                  {priorityOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSelection("priority", opt.value)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold border transition-all ${
                        form.priority === opt.value
                          ? `${opt.color} ring-2 ring-offset-1 ring-gray-200 shadow-sm`
                          : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                  <Activity size={16} className="text-teal-500"/> Status
                </label>
                <div className="relative bg-gray-100 p-1 rounded-xl flex">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSelection("status", opt.value)}
                      className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all z-10 ${
                        form.status === opt.value
                          ? "bg-white text-teal-600 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                <Calendar size={16} className="text-teal-500"/> Due Date
              </label>
              <input
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition outline-none text-gray-700"
              />
            </div>

            {/* Footer */}
            <div className="flex gap-4 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate("/app/tasks")}
                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition flex-1"
              >
                Discard Changes
              </button>
              
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold hover:shadow-lg hover:shadow-teal-500/30 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2 flex-[2] disabled:opacity-70"
              >
                {saving ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    <Save size={18} /> Update Task
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </motion.div>
  );
}