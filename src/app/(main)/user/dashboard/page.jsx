"use client";

import {
    FiBookOpen,
    FiHeart,
    FiStar,
    FiTrendingUp,
    FiBell,
    FiPlusCircle,
    FiBookmark,
} from "react-icons/fi";

const features = [
    {
        icon: FiBookOpen,
        title: "My Lessons",
        value: 24,
        description: "Life lessons you've created and shared.",
    },
    {
        icon: FiBookmark,
        title: "Saved Lessons",
        value: 48,
        description: "Lessons you've bookmarked for later.",
    },
    {
        icon: FiHeart,
        title: "Total Likes",
        value: "1.2K",
        description: "Community engagement on your lessons.",
    },
    {
        icon: FiStar,
        title: "Premium Status",
        value: "Active",
        description: "Access premium content and features.",
    },
];

const activity = [
    {
        title: "New lesson published",
        subtitle: "The Power of Self Reflection",
        date: "Today",
    },
    {
        title: "Lesson added to favorites",
        subtitle: "Lessons from Failure",
        date: "Yesterday",
    },
    {
        title: "Received 12 new likes",
        subtitle: "Growth Mindset Journey",
        date: "2 days ago",
    },
];

const DashBoardPage = () => {
    return (
        <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 transition-colors duration-300 text-slate-900 dark:text-white p-4 md:p-8">

            {/* Background Glow */}
            <div className="pointer-events-none fixed top-0 left-0 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full" />
            <div className="pointer-events-none fixed bottom-0 right-0 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full" />

            <div className="relative max-w-7xl mx-auto space-y-8">

                {/* Hero */}
                <section className="overflow-hidden rounded-[32px] border border-slate-200/60 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-xl">

                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10" />

                    <div className="relative p-8 md:p-12 flex flex-col lg:flex-row justify-between gap-8">

                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full border border-purple-300 dark:border-purple-500/20 bg-purple-50 dark:bg-purple-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-300">
                                Reflectify Dashboard
                            </span>

                            <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight">
                                Welcome Back to{" "}
                                <span className="bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
                                    Reflectify
                                </span>
                            </h1>

                            <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300 leading-relaxed">
                                Track your personal growth journey, manage life
                                lessons, discover community wisdom, and monitor
                                your learning progress from one beautiful
                                dashboard.
                            </p>
                        </div>

                        <div className="rounded-3xl bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 md:min-w-[280px] shadow-xl">

                            <p className="uppercase tracking-widest text-sm text-white/70">
                                Growth Progress
                            </p>

                            <h2 className="mt-4 text-4xl font-bold">
                                82%
                            </h2>

                            <p className="mt-2 text-sm text-white/80">
                                You've completed most of your learning journey
                                goals this month.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats Cards */}
                <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group rounded-[28px] border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg">
                                <feature.icon size={24} />
                            </div>

                            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                                {feature.title}
                            </p>

                            <h3 className="mt-2 text-3xl font-bold">
                                {feature.value}
                            </h3>

                            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Content Grid */}
                <section className="grid xl:grid-cols-[1.6fr_1fr] gap-6">

                    {/* Activity */}
                    <div className="rounded-[30px] border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl p-8">

                        <div className="flex justify-between items-center">

                            <div>
                                <p className="text-sm uppercase tracking-widest text-slate-500">
                                    Recent Activity
                                </p>

                                <h2 className="mt-2 text-2xl font-bold">
                                    Latest Updates
                                </h2>
                            </div>

                            <button className="px-5 py-2 rounded-xl border border-slate-300 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition">
                                View All
                            </button>
                        </div>

                        <div className="mt-8 space-y-4">
                            {activity.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 p-5"
                                >
                                    <div className="flex justify-between">

                                        <div>
                                            <h3 className="font-semibold">
                                                {item.title}
                                            </h3>

                                            <p className="text-sm mt-1 text-slate-500 dark:text-slate-400">
                                                {item.subtitle}
                                            </p>
                                        </div>

                                        <span className="text-xs bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 px-3 py-1 rounded-full">
                                            {item.date}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="space-y-6">

                        {/* Progress */}
                        <div className="rounded-[30px] border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl p-8">

                            <div className="flex justify-between">

                                <div>
                                    <p className="uppercase tracking-widest text-sm text-slate-500">
                                        Monthly Progress
                                    </p>

                                    <h3 className="mt-2 text-xl font-bold">
                                        Reflection Journey
                                    </h3>
                                </div>

                                <FiTrendingUp
                                    size={28}
                                    className="text-purple-500"
                                />
                            </div>

                            <div className="mt-6 h-4 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-purple-500 to-blue-600" />
                            </div>

                            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                                Keep sharing meaningful lessons to reach 100%
                                growth this month.
                            </p>
                        </div>

                        {/* Quick Actions */}
                        <div className="rounded-[30px] border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl p-8">

                            <div className="flex justify-between">

                                <div>
                                    <p className="uppercase tracking-widest text-sm text-slate-500">
                                        Quick Actions
                                    </p>

                                    <h3 className="mt-2 text-xl font-bold">
                                        Get Started
                                    </h3>
                                </div>

                                <FiBell
                                    size={24}
                                    className="text-blue-500"
                                />
                            </div>

                            <div className="mt-6 space-y-3">

                                <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 py-3 text-white font-semibold shadow-lg">
                                    <FiPlusCircle />
                                    Add New Lesson
                                </button>

                                <button className="w-full rounded-xl border border-slate-300 dark:border-white/10 py-3 hover:bg-slate-100 dark:hover:bg-white/10 transition">
                                    Manage My Lessons
                                </button>

                                <button className="w-full rounded-xl border border-slate-300 dark:border-white/10 py-3 hover:bg-slate-100 dark:hover:bg-white/10 transition">
                                    Browse Public Lessons
                                </button>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        </main>
    );
};

export default DashBoardPage;