import { Navigation } from "@/components/Navigation";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <Navigation />
        <div className="flex-1 p-4 lg:p-10">{children}</div>
      </div>
    </div>
  );
}
