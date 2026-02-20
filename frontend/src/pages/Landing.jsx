import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight text-slate-800 transition-colors hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 rounded"
          >
            Apptware
          </Link>
          <Link
            to="/tasks"
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-slate-700 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
          >
            Go to Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-sm uppercase tracking-widest text-slate-500 mb-4"
          >
            Task Management
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Manage tasks,{' '}
            <span className="text-slate-600">ship faster.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="mt-6 text-lg text-slate-600 sm:text-xl max-w-2xl mx-auto"
          >
            A simple, focused task manager to keep your work organized and your team aligned.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="mt-10"
          >
            <Link
              to="/tasks"
              className="inline-flex items-center rounded-lg bg-slate-900 px-6 py-3 text-base font-medium text-white transition-all hover:bg-slate-700 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
            >
              Get started
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything you need
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Built for clarity and speed. No clutter, no complexity.
            </p>
          </AnimatedSection>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                title: 'Simple workflow',
                description: 'Create, edit, and complete tasks in one place. No learning curve.',
                icon: '◆',
              },
              {
                title: 'Stay organized',
                description: 'Keep projects and priorities clear so you can focus on what matters.',
                icon: '◇',
              },
              {
                title: 'Always in sync',
                description: 'Your tasks are saved and available wherever you work.',
                icon: '○',
              },
            ].map((feature, i) => (
              <AnimatedSection key={feature.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="text-2xl text-slate-400 group-hover:text-slate-600 transition-colors">
                    {feature.icon}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-slate-600">
                    {feature.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <AnimatedSection className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-slate-900 px-8 py-16 sm:px-12 sm:py-20">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Ready to get organized?
            </h2>
            <p className="mt-4 text-slate-300">
              Start managing your tasks in seconds. No sign-up required.
            </p>
            <Link
              to="/create"
              className="mt-8 inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-medium text-slate-900 transition-all hover:bg-slate-100 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
            >
              Create your first task
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 rounded"
            >
              Apptware
            </Link>
            <div className="flex gap-8">
              <Link
                to="/tasks"
                className="text-sm text-slate-500 hover:text-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 rounded"
              >
                Dashboard
              </Link>
              <Link
                to="/create"
                className="text-sm text-slate-500 hover:text-slate-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 rounded"
              >
                Create Task
              </Link>
            </div>
          </div>
          <p className="mt-8 text-center text-sm text-slate-400 sm:text-left">
            © {new Date().getFullYear()} Apptware. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
