import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import TaskCard from "../components/TaskCard";
import { Link } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks");

      // Backend returns: { data: [...], total }
      const fetchedTasks = res.data?.data || [];

      // Convert backend _id → id for frontend components
      const normalized = fetchedTasks.map((t) => ({
        ...t,
        id: t._id,
      }));

      setTasks(normalized);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;

    try {
      await axios.delete(`/tasks/${id}`);

      // Remove from UI state
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Link to="/app/tasks/add" className="px-4 py-2 bg-indigo-600 text-white rounded">
          Add Task
        </Link>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : tasks.length === 0 ? (
        <div className="p-8 text-center border rounded bg-white">
          No tasks yet.{" "}
          <Link className="text-indigo-600" to="/app/tasks/add">
            Create one
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
