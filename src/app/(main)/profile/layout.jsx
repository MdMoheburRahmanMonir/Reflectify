
import { Navigation } from "@/components/profilepage/Navigation";
import { userSessionServer } from "@/lib/actions/session";
import { redirect } from "next/navigation";

const navigationItems = [
  { href: "/profile", label: "Home", subtitle: "Profile overview and recent activity" },
  { href: "/profile/editprofile", label: "Edit Profile", subtitle: "Update your password and personal info" },
  { href: "/profile/faq", label: "FAQ", subtitle: "Frequently asked questions and help" },
];

export default async function ProfileLayout({ children }) {
  const session = await userSessionServer(); 
  if (!session?.user) {
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
