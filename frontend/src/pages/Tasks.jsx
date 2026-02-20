import { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getTasks, deleteTask } from '../services/taskService';
import Layout from '../components/Layout';

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

function Tasks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFromUrl = searchParams.get('search') ?? '';
  const statusFromUrl = searchParams.get('status') ?? '';

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState(searchFromUrl);
  const [deletingId, setDeletingId] = useState(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (searchFromUrl) params.search = searchFromUrl;
      if (statusFromUrl) params.status = statusFromUrl;
      const data = await getTasks(params);
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to load tasks');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, [searchFromUrl, statusFromUrl]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Keep local search input in sync with URL (e.g. back/forward)
  useEffect(() => {
    setSearchInput(searchFromUrl);
  }, [searchFromUrl]);

  // Debounce search -> URL so we don't refetch on every keystroke
  useEffect(() => {
    const t = setTimeout(() => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        const trimmed = searchInput.trim();
        if (trimmed) next.set('search', trimmed);
        else next.delete('search');
        return next;
      }, { replace: true });
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput, setSearchParams]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleStatusChange = (e) => {
    const value = e.target.value;
    const next = new URLSearchParams(searchParams);
    if (value) next.set('status', value);
    else next.delete('status');
    setSearchParams(next, { replace: true });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    setDeletingId(id);
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Layout>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <input
              type="search"
              placeholder="Search tasks..."
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500/20 sm:w-56"
              aria-label="Search tasks"
            />
            <select
              value={statusFromUrl}
              onChange={handleStatusChange}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500/20 sm:w-40"
              aria-label="Filter by status"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value || 'all'} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <Link
            to="/create"
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
          >
            Create
          </Link>
        </div>

        {/* Content */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 px-4" role="status" aria-label="Loading">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
              <p className="mt-4 text-sm text-slate-500">Loading tasks…</p>
            </div>
          ) : error ? (
            <div className="py-16 px-4 text-center">
              <p className="text-slate-600">{error}</p>
              <button
                type="button"
                onClick={() => fetchTasks()}
                className="mt-4 min-h-[44px] rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
              >
                Retry
              </button>
            </div>
          ) : tasks.length === 0 ? (
            <div className="py-16 px-4 text-center">
              <p className="text-slate-500">No tasks found.</p>
              <Link
                to="/create"
                className="mt-4 inline-flex min-h-[44px] items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
              >
                Create your first task
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80">
                    <th className="px-4 py-3 font-semibold text-slate-700">Title</th>
                    <th className="hidden px-4 py-3 font-semibold text-slate-700 md:table-cell">Description</th>
                    <th className="px-4 py-3 font-semibold text-slate-700">Status</th>
                    <th className="hidden px-4 py-3 font-semibold text-slate-700 sm:table-cell">Created</th>
                    <th className="px-4 py-3 font-semibold text-slate-700 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr
                      key={task._id}
                      className="border-b border-slate-100 transition-colors hover:bg-slate-50/50"
                    >
                      <td className="px-4 py-3 font-medium text-slate-900">{task.title}</td>
                      <td className="hidden max-w-[200px] truncate px-4 py-3 text-slate-600 md:table-cell">
                        {task.description || '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            task.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 text-slate-500 sm:table-cell">
                        {formatDate(task.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            to={`/edit/${task._id}`}
                            className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(task._id)}
                            disabled={deletingId === task._id}
                            className="min-h-[44px] rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 disabled:opacity-50"
                          >
                            {deletingId === task._id ? '…' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Tasks;
