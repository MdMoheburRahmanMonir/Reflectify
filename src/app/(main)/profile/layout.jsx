'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { href: "/profile", label: "Home", subtitle: "Profile overview and recent activity" },
  { href: "/profile/editprofile", label: "Edit Profile", subtitle: "Update your password and personal info" },
  { href: "/profile/faq", label: "FAQ", subtitle: "Frequently asked questions and help" },
];

export default function ProfileLayout({ children }) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-8 px-4">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[300px_1fr]">
        <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/95 h-fit lg:sticky lg:top-8">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Profile</p>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 dark:text-slate-100">Account settings</h1>
          </div>

          <div className="space-y-3">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block w-full rounded-3xl px-5 py-4 text-left transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
                  }`}
                >
                  <span className="block text-sm font-semibold">{item.label}</span>
                  <span className={`mt-1 block text-sm ${isActive ? "text-blue-100" : "text-slate-500 dark:text-slate-400"}`}>
                    {item.subtitle}
                  </span>
                </Link>
              );
            })}
          </div>
        </aside>

        <section className="space-y-6">
          {children}
        </section>
      </div>
    </main>
  );
}
