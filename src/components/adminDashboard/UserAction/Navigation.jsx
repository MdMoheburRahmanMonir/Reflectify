"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiMenu } from "react-icons/fi";
import { Button, Drawer } from "@heroui/react";
import { FaAddressBook, FaUserAstronaut } from "react-icons/fa";
import { MdBugReport, MdManageAccounts } from "react-icons/md";
import { SessionClient } from "@/lib/actions/sessionClient";
const navItems = [
  { icon: FiHome, label: "Home", href: "/admin/dashboard" },
  { icon: MdManageAccounts, label: "Manage User", href: "/admin/dashboard/manage-users" },
  { icon: FaAddressBook, label: "Manage Lessons", href: "/admin/dashboard/manage-lessons" },
  { icon: MdBugReport, label: "Reported Lessons", href: "/admin/dashboard/reported-lessons" },
  { icon: FaUserAstronaut, label: "Profile", href: "/profile" },
];

export function Navigation() {
  const pathname = usePathname();
  const session = SessionClient();

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <aside
        className=" hidden lg:flex lg:h-screen lg:w-72 lg:flex-col sticky top-0 border-r border-slate-200 dark:border-white/10  bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl " >
        {/* Glow */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-purple-500/10 via-blue-500/5 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="relative px-6 pt-8 pb-10">
          <div className="flex items-center gap-3">
            <div
              className=" h-12 w-12 rounded-2xl bg-gradient-to-r  from-purple-500/20  to-blue-600/20 flex items-center justify-center  text-white font-bold text-lg shadow-lg "
            >
              <img src="/ChatGPT Image Jun 18, 2026, 10_34_43 AM.png" alt="logo" className="w-8 h-8" />
            </div> 
            <div>
              <h2 className="font-bold text-2xl bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
                Reflectify
              </h2> 
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Wisdom Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="relative flex-1 px-4 space-y-2">

          {navItems.map((item) => {
            const Icon = item.icon;

            const active = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={` group flex items-center gap-4 rounded-2xl px-4 py-3 font-medium transition-all duration-300 
                 ${active ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
                  } `} >
                <Icon className={` h-5 w-5 transition-transform duration-300 group-hover:scale-110 `} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}