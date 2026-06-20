"use client";

import { useMemo, useState } from "react";
import {
    FiSearch,
    FiFilter,
    FiUserPlus,
    FiTrash2,
    FiShield,
    FiArrowRight,
} from "react-icons/fi";
import Link from "next/link";

const users = [
    {
        id: "U-1001",
        name: "Amina Rahman",
        email: "amina.rahman@example.com",
        role: "user",
        plan: "free",
        lessons: 12,
        joinedAt: "Mar 14, 2026",
    },
    {
        id: "U-1002",
        name: "Rafi Ahmed",
        email: "rafi.ahmed@example.com",
        role: "admin",
        plan: "premium",
        lessons: 58,
        joinedAt: "Feb 09, 2026",
    },
    {
        id: "U-1003",
        name: "Sabila Noor",
        email: "sabila.noor@example.com",
        role: "user",
        plan: "premium",
        lessons: 34,
        joinedAt: "Apr 02, 2026",
    },
    {
        id: "U-1004",
        name: "Fahim Khan",
        email: "fahim.khan@example.com",
        role: "user",
        plan: "free",
        lessons: 8,
        joinedAt: "May 21, 2026",
    },
];

const ManageUserPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch =
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesRole =
                roleFilter === "all" || user.role === roleFilter;

            return matchesSearch && matchesRole;
        });
    }, [searchTerm, roleFilter]);

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <section className="rounded-[32px] border border-slate-200/70 bg-white/90 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
                                Admin / Manage users
                            </p>
                            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                                User management dashboard
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                                Review accounts, promote contributors, and remove inactive or abusive users quickly.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2 lg:justify-end">
                            <Link
                                href="/admin/dashboard/manage-lessons"
                                className="inline-flex items-center justify-center gap-2 rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
                            >
                                <FiShield className="h-5 w-5" />
                                Manage lessons
                            </Link>
                            <Link
                                href="/admin/dashboard/reported-lessons"
                                className="inline-flex items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-violet-500 hover:bg-violet-50 dark:border-white/10 dark:bg-slate-900 dark:text-white"
                            >
                                <FiShield className="h-5 w-5" />
                                Reported lessons
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Total users</p>
                        <h2 className="mt-4 text-3xl font-bold">{users.length}</h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            Registered users on the platform.
                        </p>
                    </div>
                    <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Admins</p>
                        <h2 className="mt-4 text-3xl font-bold">{users.filter((user) => user.role === "admin").length}</h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            Users with admin privileges.
                        </p>
                    </div>
                    <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Premium users</p>
                        <h2 className="mt-4 text-3xl font-bold">{users.filter((user) => user.plan === "premium").length}</h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            Users with premium membership.
                        </p>
                    </div>
                </section>

                <section className="rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">User accounts</h2>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Search, filter, and act on any user account in the system.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-[1fr_auto] lg:w-[520px]">
                            <label className="relative block">
                                <span className="sr-only">Search users</span>
                                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <FiSearch className="h-4 w-4" />
                                </span>
                                <input
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Search by name or email"
                                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400"
                                />
                            </label>
                            <div className="relative">
                                <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <select
                                    value={roleFilter}
                                    onChange={(event) => setRoleFilter(event.target.value)}
                                    className="w-full rounded-3xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400"
                                >
                                    <option value="all">All roles</option>
                                    <option value="user">Users</option>
                                    <option value="admin">Admins</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 overflow-x-auto">
                        <table className="min-w-full border-separate border-spacing-0 text-left text-sm leading-6 text-slate-700 dark:text-slate-300">
                            <thead>
                                <tr>
                                    <th className="border-b border-slate-200/70 bg-slate-50 px-4 py-4 dark:border-white/10 dark:bg-slate-900">Name</th>
                                    <th className="border-b border-slate-200/70 bg-slate-50 px-4 py-4 dark:border-white/10 dark:bg-slate-900">Email</th>
                                    <th className="border-b border-slate-200/70 bg-slate-50 px-4 py-4 dark:border-white/10 dark:bg-slate-900">Role</th>
                                    <th className="border-b border-slate-200/70 bg-slate-50 px-4 py-4 dark:border-white/10 dark:bg-slate-900">Plan</th>
                                    <th className="border-b border-slate-200/70 bg-slate-50 px-4 py-4 dark:border-white/10 dark:bg-slate-900">Lessons</th>
                                    <th className="border-b border-slate-200/70 bg-slate-50 px-4 py-4 dark:border-white/10 dark:bg-slate-900">Joined</th>
                                    <th className="border-b border-slate-200/70 bg-slate-50 px-4 py-4 dark:border-white/10 dark:bg-slate-900">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="border-b border-slate-200/70 dark:border-white/10">
                                        <td className="px-4 py-4">
                                            <p className="font-semibold text-slate-900 dark:text-white">{user.name}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{user.id}</p>
                                        </td>
                                        <td className="px-4 py-4">{user.email}</td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${user.role === "admin" ? "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200" : "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${user.plan === "premium" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200" : "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}>
                                                {user.plan}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">{user.lessons}</td>
                                        <td className="px-4 py-4">{user.joinedAt}</td>
                                        <td className="px-4 py-4">
                                            <div className="flex flex-wrap gap-2">
                                                <button className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-violet-600">
                                                    <FiShield className="h-4 w-4" />
                                                    Promote
                                                </button>
                                                <button className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-700">
                                                    <FiUserPlus className="h-4 w-4" />
                                                    Role
                                                </button>
                                                <button className="inline-flex items-center gap-2 rounded-full bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600">
                                                    <FiTrash2 className="h-4 w-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                                            No users found matching those filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ManageUserPage;
