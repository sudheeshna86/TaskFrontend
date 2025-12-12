import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inprogress: 0,
    completed: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchStats = async () => {
      try {
        const res = await axios.get("/tasks");

        if (cancelled) return;

        const tasks = res.data?.data || [];

        const pending = tasks.filter((t) => t.status === "pending").length;
        const inprogress = tasks.filter((t) => t.status === "inprogress").length;
        const completed = tasks.filter((t) => t.status === "completed").length;

        setStats({
          total: tasks.length,
          pending,
          inprogress,
          completed,
        });
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchStats();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-xl shadow">
            <div className="text-sm text-gray-500">Total Tasks</div>
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow">
            <div className="text-sm text-gray-500">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending}
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow">
            <div className="text-sm text-gray-500">In Progress</div>
            <div className="text-2xl font-bold text-blue-600">
              {stats.inprogress}
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl shadow">
            <div className="text-sm text-gray-500">Completed</div>
            <div className="text-2xl font-bold text-green-600">
              {stats.completed}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
