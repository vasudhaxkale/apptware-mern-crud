import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';
const API_BASE = `${VITE_API_URL}/api`;

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Fetch tasks with optional search and status filters.
 * @param {{ search?: string, status?: string }} params
 * @returns {Promise<{ data: Array }>}
 */
export async function getTasks(params = {}) {
  const { data } = await api.get('/tasks', { params });
  return data;
}

/**
 * Fetch a single task by id.
 * @param {string} id
 * @returns {Promise<Object>}
 */
export async function getTask(id) {
  const { data } = await api.get(`/tasks/${id}`);
  return data;
}

/**
 * Create a new task.
 * @param {{ title: string, description?: string, status?: string, category?: string }} payload
 * @returns {Promise<Object>}
 */
export async function createTask(payload) {
  const { data } = await api.post('/tasks', payload);
  return data;
}

/**
 * Update a task by id.
 * @param {string} id
 * @param {{ title?: string, description?: string, status?: string, category?: string }} payload
 * @returns {Promise<Object>}
 */
export async function updateTask(id, payload) {
  const { data } = await api.put(`/tasks/${id}`, payload);
  return data;
}

/**
 * Delete a task by id.
 * @param {string} id
 */
export async function deleteTask(id) {
  await api.delete(`/tasks/${id}`);
}
