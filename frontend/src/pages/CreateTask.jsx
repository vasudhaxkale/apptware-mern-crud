import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createTask } from '../services/taskService';
import Layout from '../components/Layout';

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
];

const initialForm = { title: '', description: '', status: 'pending', category: '' };

function CreateTask() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = 'Title is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;
    setSubmitting(true);
    try {
      await createTask({
        title: form.title.trim(),
        description: form.description.trim() || undefined,
        status: form.status,
        category: form.category.trim() || undefined,
      });
      navigate('/tasks');
    } catch (err) {
      setSubmitError(err.response?.data?.error || err.message || 'Failed to create task');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-900 placeholder-slate-400 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500/20';
  const inputErrorClass = 'border-red-500 focus:border-red-500 focus:ring-red-500/20';

  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Create Task</h1>
          <Link
            to="/tasks"
            className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
          >
            ← Back to tasks
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {submitError && (
            <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
              {submitError}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-slate-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="Task title"
                className={`${inputClass} ${errors.title ? inputErrorClass : ''}`}
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? 'title-error' : undefined}
              />
              {errors.title && (
                <p id="title-error" className="mt-1.5 text-sm text-red-600">
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Optional description"
                rows={3}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="status" className="mb-1.5 block text-sm font-medium text-slate-700">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className={inputClass}
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-slate-700">
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                value={form.category}
                onChange={handleChange}
                placeholder="Optional category"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="min-h-[44px] rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 disabled:opacity-50"
            >
              {submitting ? 'Creating…' : 'Create task'}
            </button>
            <Link
              to="/tasks"
              className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default CreateTask;
