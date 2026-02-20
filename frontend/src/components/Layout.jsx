import { Link } from 'react-router-dom';

/**
 * Reusable layout with header and optional footer.
 * Matches Landing page slate theme (Tailwind).
 * @param {{ children: React.ReactNode, showFooter?: boolean }} props
 */
function Layout({ children, showFooter = true }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center text-xl font-semibold tracking-tight text-slate-800 transition-colors hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 rounded"
          >
            Apptware
          </Link>
          <nav className="flex flex-wrap items-center gap-2 sm:gap-4" aria-label="Main navigation">
            <Link
              to="/tasks"
              className="inline-flex min-h-[44px] items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 sm:px-4 sm:py-2.5"
            >
              Tasks
            </Link>
            <Link
              to="/create"
              className="inline-flex min-h-[44px] items-center rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition-all hover:bg-slate-700 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 sm:px-4 sm:py-2.5"
            >
              Create task
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      {showFooter && (
        <footer className="border-t border-slate-200 bg-white py-6">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <Link
                to="/"
                className="inline-flex min-h-[44px] items-center text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 rounded"
              >
                Apptware
              </Link>
              <p className="text-sm text-slate-400">
                © {new Date().getFullYear()} Apptware. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default Layout;
