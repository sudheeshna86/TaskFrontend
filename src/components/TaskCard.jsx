import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  Activity
} from "lucide-react";

export default function TaskCard({ task, onDelete }) {
  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "No Date";

  // --- Status Styling ---
  const statusConfig = {
    pending: {
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
      icon: <Clock size={14} strokeWidth={2.5} />,
      label: "Pending",
    },
    inprogress: {
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: <Activity size={14} strokeWidth={2.5} />,
      label: "In Progress",
    },
    completed: {
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      icon: <CheckCircle size={14} strokeWidth={2.5} />,
      label: "Done",
    },
  };

  const priorityConfig = {
    low: { dot: "bg-slate-400", text: "text-slate-500", label: "Low" },
    medium: { dot: "bg-orange-400", text: "text-orange-600", label: "Medium" },
    high: { dot: "bg-rose-500", text: "text-rose-600", label: "High" },
  };

  const currentStatus = statusConfig[task.status.toLowerCase()] || statusConfig.pending;
  const currentPriority = priorityConfig[task.priority.toLowerCase()] || priorityConfig.low;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-lg 
                 border border-gray-100 flex flex-col justify-between"
    >
      {/* Decorative subtle glow */}
      <div
        className={`absolute -right-10 -top-10 w-32 h-32 rounded-full 
        ${currentStatus.bg} opacity-40 blur-2xl pointer-events-none`}
      />

      {/* Top section */}
      <div className="flex justify-between items-start mb-4 z-10">
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full border">
          <span className={`w-2 h-2 rounded-full ${currentPriority.dot}`} />
          <span
            className={`text-[11px] font-bold uppercase tracking-wider ${currentPriority.text}`}
          >
            {currentPriority.label}
          </span>
        </div>
      </div>

      {/* Title + Description */}
      <div className="z-10">
        <h3 className="text-xl font-bold text-gray-800 mb-1">
          {task.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          {task.description || "No description"}
        </p>
      </div>

      {/* Footer: Date + Status */}
      <div className="flex justify-between items-center border-t pt-3 mt-auto z-10">
        <div>
          <p className="text-[11px] uppercase text-gray-400 font-bold">Due</p>
          <div className="flex items-center gap-1 text-gray-600 font-medium text-sm">
            <Calendar size={14} />
            {formattedDate}
          </div>
        </div>

        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border 
          ${currentStatus.bg} ${currentStatus.border} ${currentStatus.color}`}
        >
          {currentStatus.icon}
          <span className="text-xs font-bold">{currentStatus.label}</span>
        </div>
      </div>

      {/* --- BIG BUTTONS SECTION --- */}
      <div className="flex gap-3 mt-6 z-10">
        <Link
          to={`/app/tasks/edit/${task.id}`}
          className="w-1/2 py-2 rounded-lg text-center text-white 
                     font-semibold bg-blue-600 hover:bg-blue-700 transition"
        >
          Edit
        </Link>

        <button
          onClick={() => onDelete(task.id)}
          className="w-1/2 py-2 rounded-lg text-center text-white 
                     font-semibold bg-red-600 hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}
