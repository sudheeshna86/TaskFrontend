import React, { useState } from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Save, 
  Calendar, 
  AlignLeft, 
  Type, 
  Flag, 
  Activity 
} from "lucide-react";

export default function AddTask() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "low",
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // --- Handlers ---
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Custom handler for visual selectors
  const setSelection = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...form,
        dueDate: form.dueDate || null,
      };
      await axios.post("/tasks", payload);
      navigate("/app/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  // --- UI Configs ---
  const priorityOptions = [
    { value: "low", label: "Low", color: "bg-teal-100 text-teal-700 border-teal-200 hover:bg-teal-200" },
    { value: "medium", label: "Medium", color: "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-200" },
    { value: "high", label: "High", color: "bg-rose-100 text-rose-700 border-rose-200 hover:bg-rose-200" },
  ];

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "inprogress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center p-4 bg-gray-50/50"
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
        
        {/* Header Decoration */}
        <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => navigate("/app/tasks")}
              className="p-2 rounded-full hover:bg-gray-100 transition text-gray-500"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">New Task</h1>
              <p className="text-gray-500 text-sm">What needs to be done?</p>
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center gap-2"
            >
              <span className="font-semibold">Error:</span> {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                <Type size={16} className="text-indigo-500"/> Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g., Redesign Homepage"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition outline-none text-lg font-medium text-gray-800 placeholder-gray-300"
              />
            </div>

            {/* Description Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                <AlignLeft size={16} className="text-indigo-500"/> Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Add details about this task..."
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition outline-none text-gray-700 placeholder-gray-300 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Priority Selector (Visual) */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                  <Flag size={16} className="text-indigo-500"/> Priority
                </label>
                <div className="flex gap-2">
                  {priorityOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSelection("priority", opt.value)}
                      className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold border transition-all ${
                        form.priority === opt.value
                          ? `${opt.color} ring-2 ring-offset-1 ring-gray-200`
                          : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Selector (Visual) */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                  <Activity size={16} className="text-indigo-500"/> Status
                </label>
                <div className="relative bg-gray-100 p-1 rounded-xl flex">
                  {statusOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setSelection("status", opt.value)}
                      className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all z-10 ${
                        form.status === opt.value
                          ? "bg-white text-indigo-600 shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Date Picker */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                <Calendar size={16} className="text-indigo-500"/> Due Date
              </label>
              <input
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition outline-none text-gray-700"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => navigate("/app/tasks")}
                className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition flex-1"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition flex items-center justify-center gap-2 flex-[2] disabled:opacity-70 disabled:hover:scale-100"
              >
                {loading ? (
                  "Creating..."
                ) : (
                  <>
                    <Save size={18} /> Create Task
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