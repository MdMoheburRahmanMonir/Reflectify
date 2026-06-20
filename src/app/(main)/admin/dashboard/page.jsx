"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    FiUsers,
    FiShield,
    FiBookOpen,
    FiFlag,
    FiTrendingUp,
    FiStar,
    FiChevronRight,
    FiClock,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const metrics = [
    {
        label: "Total users",
        value: "1,230",
        icon: FiUsers,
        detail: "All registered users on the platform.",
    },
    {
        label: "Public lessons",
        value: "962",
        icon: FiBookOpen,
        detail: "Lessons currently available to the community.",
    },
    {
        label: "Reported lessons",
        value: "18",
        icon: FiFlag,
        detail: "Lessons waiting for admin review.",
    },
    {
        label: "Featured lessons",
        value: "48",
        icon: FiStar,
        detail: "Lessons highlighted on the homepage.",
    },
    {
        label: "New lessons today",
        value: "24",
        icon: FiTrendingUp,
        detail: "Lessons added in the last 24 hours.",
    },
    {
        label: "Platform trust",
        value: "Stable",
        icon: FiShield,
        detail: "System health and content moderation status.",
    },
];

const quickLinks = [
    {
        label: "Manage users",
        href: "/admin/dashboard/manage-users",
        badge: "Users",
    },
    {
        label: "Review lessons",
        href: "/admin/dashboard/manage-lessons",
        badge: "Lessons",
    },
    {
        label: "View reports",
        href: "/admin/dashboard/reported-lessons",
        badge: "Flags",
    },
];

const reviewTasks = [
    {
        lesson: "Finding strength in uncertainty",
        reporter: "Amina R.",
        reason: "Inappropriate language",
        status: "Pending",
    },
    {
        lesson: "How to rebuild after failure",
        reporter: "Rafi S.",
        reason: "Misleading content",
        status: "In review",
    },
    {
        lesson: "Gratitude makes growth easier",
        reporter: "Ayesha T.",
        reason: "Premium misuse",
        status: "Resolved",
    },
];

const growthData = [
    { label: "Mon", value: 30 },
    { label: "Tue", value: 48 },
    { label: "Wed", value: 42 },
    { label: "Thu", value: 66 },
    { label: "Fri", value: 54 },
    { label: "Sat", value: 75 },
    { label: "Sun", value: 82 },
];

const AdminDashboardPage = () => {
    const { data: session, status } = authClient.useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login");
            return;
        }
        if (status === "authenticated" && session?.user?.role !== "admin") {
            router.replace("/");
        }
    }, [status, session, router]);

    if (status === "loading" || !session) {
        return (
            <div className="min-h-screen grid place-items-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4">
                <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/80 p-10 text-center shadow-xl backdrop-blur-xl">
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                        Verifying admin access
                    </p>
                    <h1 className="mt-4 text-3xl font-bold">Secure admin dashboard</h1>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">
                        Please wait while we confirm your credentials.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 text-slate-900 dark:text-white px-4 py-8">
            <div className="mx-auto max-w-7xl space-y-10">
                <section className="rounded-[32px] border border-slate-200/70 bg-white/90 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl">
                            <span className="inline-flex rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-violet-700 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-200">
                                Admin overview
                            </span>
                            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                                Digital Life Lessons — Admin Control
                            </h1>
                            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                                Monitor users, public lessons, reports, and platform health in a single command center.
                                Manage featured content, resolve flagged lessons, and keep the community safe.
                            </p>
                        </div>
                        <div className="rounded-3xl bg-gradient-to-r from-violet-500 to-sky-500 p-6 text-white shadow-2xl">
                            <p className="text-sm uppercase tracking-[0.24em] text-slate-100/80">Live moderation</p>
                            <h2 className="mt-4 text-3xl font-semibold">Action-ready</h2>
                            <p className="mt-3 text-sm text-slate-100/80">
                                Use the quick links below to jump directly into pending workflows.
                            </p>
                            <div className="mt-6 grid gap-3">
                                {quickLinks.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="inline-flex items-center justify-between rounded-3xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                                    >
                                        <span>{link.label}</span>
                                        <FiChevronRight className="h-5 w-5" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="grid gap-6 lg:grid-cols-3 xl:grid-cols-6">
                    {metrics.map((metric) => {
                        const Icon = metric.icon;
                        return (
                            <Link
                                key={metric.label}
                                href={metric.href || "/admin/dashboard/manage-lessons"}
                                className="group rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-slate-950/80"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-r from-violet-500 to-sky-500 text-white shadow-lg">
                                    <Icon className="h-6 w-6" />
                                </div>
                                <p className="mt-5 text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                                    {metric.label}
                                </p>
                                <h3 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">{metric.value}</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">{metric.detail}</p>
                            </Link>
                        );
                    })}
                </section>

                <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
                    <div className="rounded-[32px] border border-slate-200/70 bg-white/90 p-8 shadow-sm dark:border-white/10 dark:bg-slate-950/80 backdrop-blur-xl">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Growth analytics</p>
                                <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Lesson creation trend</h2>
                            </div>
                            <span className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">
                                <FiClock className="h-4 w-4" /> 7-day overview
                            </span>
                        </div>
                        <div className="mt-8 grid gap-4">
                            <div className="grid gap-2 text-sm text-slate-500 dark:text-slate-400 md:grid-cols-3">
                                {growthData.map((point) => (
                                    <div key={point.label} className="rounded-3xl border border-slate-200/70 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900/40">
                                        <p className="font-semibold text-slate-900 dark:text-white">{point.label}</p>
                                        <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                                            <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-sky-500" style={{ width: `${point.value}%` }} />
                                        </div>
                                        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{point.value}%</p>
                                    </div>
                                ))}
                            </div>
                            <div className="rounded-3xl border border-slate-200/70 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-900/40">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Weekly growth</p>
                                    <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700 dark:bg-violet-500/20 dark:text-violet-200">
                                        +18% this week
                                    </span>
                                </div>
                                <div className="mt-4 grid gap-3">
                                    {growthData.map((point) => (
                                        <div key={point.label} className="flex items-center gap-3">
                                            <span className="w-8 text-xs text-slate-500 dark:text-slate-400">{point.label}</span>
                                            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                                                <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-sky-500" style={{ width: `${point.value}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[32px] border border-slate-200/70 bg-white/90 p-8 shadow-sm dark:border-white/10 dark:bg-slate-950/80 backdrop-blur-xl">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Admin action center</p>
                        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Quick links</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                            Use these shortcuts to perform the most important admin tasks quickly.
                        </p>
                        <div className="mt-6 space-y-3">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="flex items-center justify-between rounded-3xl border border-slate-200/70 bg-slate-50 px-4 py-4 text-sm font-semibold text-slate-900 transition hover:border-violet-500 hover:bg-white dark:border-white/10 dark:bg-slate-900/60 dark:text-white dark:hover:bg-slate-950"
                                >
                                    <span>{link.label}</span>
                                    <FiChevronRight className="h-5 w-5 text-violet-600 dark:text-violet-300" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
                    <div className="rounded-[32px] border border-slate-200/70 bg-white/90 p-8 shadow-sm dark:border-white/10 dark:bg-slate-950/80 backdrop-blur-xl">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Flagged content</p>
                                <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Recent reports</h2>
                            </div>
                            <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-violet-700 dark:bg-violet-500/15 dark:text-violet-200">
                                3 items pending
                            </span>
                        </div>
                        <div className="mt-8 space-y-4">
                            {reviewTasks.map((task) => (
                                <div key={task.lesson} className="rounded-3xl border border-slate-200/70 bg-slate-50 p-5 dark:border-white/10 dark:bg-slate-900/40">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-base font-semibold text-slate-900 dark:text-white">{task.lesson}</p>
                                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Reported by {task.reporter}</p>
                                        </div>
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${task.status === "Resolved" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200" : task.status === "In review" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200" : "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200"}`}>
                                            {task.status}
                                        </span>
                                    </div>
                                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <p className="text-sm text-slate-600 dark:text-slate-400">Reason: {task.reason}</p>
                                        <button className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-600">
                                            Review now <FiChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[32px] border border-slate-200/70 bg-white/90 p-8 shadow-sm dark:border-white/10 dark:bg-slate-950/80 backdrop-blur-xl">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Admin profile</p>
                        <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">Hello, Admin</h2>
                        <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
                            Manage platform settings, keep an eye on reports, and make sure the community stays positive.
                        </p>
                        <div className="mt-6 rounded-[28px] bg-slate-50 p-6 dark:bg-slate-900/50">
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-r from-violet-500 to-sky-500 text-white text-xl font-bold">
                                    AD
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-white">Platform admin</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">admin@digitallifelessons.com</p>
                                </div>
                            </div>
                            <div className="mt-6 grid gap-3">
                                <div className="flex items-center justify-between rounded-3xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm dark:bg-slate-950 dark:text-slate-200">
                                    <span>Total actions</span>
                                    <strong>152</strong>
                                </div>
                                <div className="flex items-center justify-between rounded-3xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm dark:bg-slate-950 dark:text-slate-200">
                                    <span>Moderated lessons</span>
                                    <strong>114</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default AdminDashboardPage;
