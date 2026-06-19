'use client';

const ProfileHomePage = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/95">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">Home</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Profile overview and recent activity</p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Welcome back, Alex Morgan</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">This is your profile home page. View your current details and quick actions.</p>
          </div>
          <button className="inline-flex items-center justify-center rounded-3xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
            View activity
          </button>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Current role</p>
            <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">Product Designer</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Profile strength</p>
            <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">82%</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Email</p>
          <p className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">alex.morgan@example.com</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Member since</p>
          <p className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">March 2025</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Profile Details</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</p>
              <p className="mt-1 text-slate-600 dark:text-slate-400">Alex Morgan</p>
            </div>
            <span className="text-xs font-semibold text-green-600 dark:text-green-400">Verified</span>
          </div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Account Type</p>
              <p className="mt-1 text-slate-600 dark:text-slate-400">Job Seeker</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Account Status</p>
              <p className="mt-1 text-slate-600 dark:text-slate-400">Active</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHomePage;
