// 'use server'
import { Navigation } from "@/components/userDashboard/Navigation";
import { userSessionServer } from "@/lib/actions/session";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardLayout({ children }) {

  const session = await userSessionServer(); 
  if (session?.user?.role !== 'user') {
    redirect('/login')
  }


  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <Navigation />
        <div className="flex-1 p-4 lg:p-10">{children}</div>
      </div>
    </div>
  );
}
