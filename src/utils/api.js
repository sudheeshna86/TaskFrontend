import apiClient from "./apiClient";

// =========================
// AUTH
// =========================

export const registerUser = (data) =>
  apiClient.post("/auth/register", data);

export const loginUser = (data) =>
  apiClient.post("/auth/login", data);

// =========================
// TASKS
// =========================

export const getTasks = () =>
  apiClient.get("/tasks");

export const getTaskById = (id) =>
  apiClient.get(`/tasks/${id}`);

export const createTask = (data) =>
  apiClient.post("/tasks", data);

export const updateTask = (id, data) =>
  apiClient.put(`/tasks/${id}`, data);

export const deleteTask = (id) =>
  apiClient.delete(`/tasks/${id}`);
