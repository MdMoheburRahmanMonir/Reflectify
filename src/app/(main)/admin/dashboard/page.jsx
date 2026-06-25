import { userSessionServer } from '@/lib/actions/session';
import { TotalCollection } from '@/lib/api/adminApi/DashboardApi/TotalCollection';
import React from 'react';
import GrowthChart from '@/components/adminDashboard/GrowthChart';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

const AdminDashboardPage = async () => {
    const { token } = await auth.api.getToken({ headers: await headers()});
    
    
    
    const session = await userSessionServer(token);
    if (session?.user?.role !== 'admin') {
        redirect('/login')
    }
    console.log(token,'Token From the admin', session, 'Session From the admin');
    const data = await TotalCollection(session, token);
    // console.log(data, 'data is all api ');

    const lessonGrowth = data?.lessonGrowth ?? [];
    const userGrowth = data?.userGrowth ?? [];
    const topContributors = data?.topContributors ?? [];
    const maxLessonCount = Math.max(1, ...lessonGrowth.map((item) => item?.count ?? 0));
    const maxUserCount = Math.max(1, ...userGrowth.map((item) => item?.count ?? 0));

    return (
        <div className="space-y-8">
            <header className="rounded-3xl bg-gradient-to-r from-purple-500 to-blue-500 p-8 shadow-2xl shadow-slate-900/20 text-white  ">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-cyan-100/90">Admin overview</p>
                        <h1 className="mt-3 text-4xl font-bold">Platform analytics</h1>
                        <p className="mt-3 max-w-2xl text-slate-100/90 dark:text-slate-300">
                            A centralized view of Reflectify performance, activity trends, and contributor impact across the platform.
                        </p>
                    </div>
                    <div className="rounded-3xl backdrop-blur-2xl bg-black/10 px-6 py-4 ring-1 ring-slate-200/80 shadow-sm shadow-slate-900/10 text-slate-950 dark:ring-white/10 dark:text-white">
                        <p className="text-xs uppercase tracking-[0.3em] text-white">Status</p>
                        <p className="mt-2 text-3xl font-semibold text-white">Healthy</p>
                        <p className="mt-1 text-sm text-white">All systems are operating normally.</p>
                    </div>
                </div>
            </header>

            <section className="grid gap-6 xl:grid-cols-4 lg:grid-cols-2">

                <article className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-200/50 transition hover:-translate-y-1 dark:border-slate-800/70 dark:bg-slate-950/90 dark:shadow-slate-950/40 dark:ring-slate-800/70">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                Total Users
                            </p>
                            <p className="mt-4 text-4xl font-bold text-slate-950 dark:text-white">{data.totalUsers}</p>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span>Active across the platform</span>
                    </div>
                </article>

                <article className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-200/50 transition hover:-translate-y-1 dark:border-slate-800/70 dark:bg-slate-950/90 dark:shadow-slate-950/40 dark:ring-slate-800/70">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                Total Public Lessons
                            </p>
                            <p className="mt-4 text-4xl font-bold text-slate-950 dark:text-white">{data.publicLessons}</p>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span>Public accessible lessons</span>
                    </div>
                </article>

                <article className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-200/50 transition hover:-translate-y-1 dark:border-slate-800/70 dark:bg-slate-950/90 dark:shadow-slate-950/40 dark:ring-slate-800/70">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                Reported Lessons
                            </p>
                            <p className="mt-4 text-4xl font-bold text-slate-950 dark:text-white">{data.reportedLessons}</p>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span>Flagged lesson reports</span>
                    </div>
                </article>

                <article className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-200/50 transition hover:-translate-y-1 dark:border-slate-800/70 dark:bg-slate-950/90 dark:shadow-slate-950/40 dark:ring-slate-800/70">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                Today's New Lessons
                            </p>
                            <p className="mt-4 text-4xl font-bold text-slate-950 dark:text-white">{data.newLessonsToday}</p>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span>New lessons added today</span>
                    </div>
                </article>
            </section>

            <section className="grid gap-2 max-w-4xl xl:grid-cols-[1fr_0.8fr]">
                <GrowthChart data={lessonGrowth} title={"Lesson Growth"} heading={`Weekly lesson activity`} />
                <GrowthChart data={userGrowth} title={"User Growth"} heading={`Weekly user activity`} />
            </section>
            <section className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
                <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-200/50 dark:border-slate-800/70 dark:bg-slate-950/90 dark:shadow-slate-950/40 dark:ring-slate-800/70">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Top contributors</h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">The most active creators this week.</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">Leaderboard</span>
                    </div>

                    <div className="mt-6 space-y-4">
                        {topContributors.length > 0 ? (
                            topContributors.map((contributor, index) => (
                                <div key={contributor._id || index} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800/80 dark:bg-slate-900/80">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-lg font-semibold text-slate-950 dark:text-white">{contributor.userName}</p>
                                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Lessons: {contributor.lessonCount}</p>
                                        </div>
                                        <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                            #{index + 1}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800/80 dark:bg-slate-900/80">
                                <p className="text-sm text-slate-500 dark:text-slate-400">No contributor data available.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-200/50 dark:border-slate-800/70 dark:bg-slate-950/90 dark:shadow-slate-950/40 dark:ring-slate-800/70">
                    <h2 className="text-2xl font-semibold text-slate-950 dark:text-white">Insights</h2>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Quick metrics to surface platform momentum and operational focus.</p>

                    <div className="mt-6 space-y-5">
                        <div className="rounded-3xl bg-gradient-to-br from-cyan-500 to-sky-600 p-5 text-white shadow-lg shadow-cyan-500/20">
                            <p className="text-sm uppercase tracking-[0.25em] text-cyan-100/80">Referral activity</p>
                            <p className="mt-3 text-3xl font-semibold">+24%</p>
                            <p className="mt-2 text-sm text-cyan-100/80">Monthly referrals from existing members.</p>
                        </div>

                        <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900/80">
                            <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Review backlog</p>
                            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">42</p>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Lessons currently pending admin approval.</p>
                        </div>

                        <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-900/80">
                            <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Average lesson quality</p>
                            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">4.8 / 5</p>
                            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Community rating of public lesson content.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AdminDashboardPage;