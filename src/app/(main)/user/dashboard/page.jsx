

import {
    FiBookOpen,
    FiHeart,
    FiStar,
    FiTrendingUp,
    FiBell,
    FiPlusCircle,
    FiBookmark,
} from "react-icons/fi";
import GrowthChart from '@/components/adminDashboard/GrowthChart';
import Link from "next/link";
import { AdminDashboardFullData } from "@/lib/api/userapi/Dashboard/AdminDashboardFullData";
import { userSessionServer } from "@/lib/actions/session";


const DashBoardPage = async () => {
    const session = await userSessionServer();
    const data = await AdminDashboardFullData(session);
    console.log(data, 'public like is ');

    const topContributors = data?.topContributors ?? [];
    const UserContributorsResult = data?.Average ?? [];

    return (
        <main className="min-h-screen p-6 md:p-8  dark:text-white">
            <div className="max-w-7xl mx-auto space-y-8">
                <header className="rounded-3xl bg-gradient-to-r from-purple-500 to-blue-600 p-8 shadow-2xl text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.3em] text-white/90">User overview</p>
                            <h1 className="mt-2 text-3xl font-bold">Your dashboard</h1>
                            <p className="mt-2 text-sm text-white/80 max-w-xl">A focused view of your lessons, progress, and activity on Reflectify.</p>
                        </div>
                    </div>
                </header>

                <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    <article className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-200/50 transition hover:-translate-y-1 dark:border-slate-800/70 dark:bg-slate-950/90 dark:shadow-slate-950/40 dark:ring-slate-800/70">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                    Total Lesson Created
                                </p>
                                <p className="mt-4 text-4xl font-bold text-slate-950 dark:text-white">{data.totalLessonCreated}</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <span>In this week you have created {data.totalLessonCreated} lessons</span>
                        </div>
                    </article>

                    <article className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-200/50 transition hover:-translate-y-1 dark:border-slate-800/70 dark:bg-slate-950/90 dark:shadow-slate-950/40 dark:ring-slate-800/70">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                    Total Saved Lesson
                                </p>
                                <p className="mt-4 text-4xl font-bold text-slate-950 dark:text-white">{data.TotalSavedLesson}</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <span>Lessons you have saved</span>
                        </div>
                    </article>

                    <article className="rounded-3xl border border-slate-200/70 bg-white/90 p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-200/50 transition hover:-translate-y-1 dark:border-slate-800/70 dark:bg-slate-950/90 dark:shadow-slate-950/40 dark:ring-slate-800/70">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                    Public Likes
                                </p>
                                <p className="mt-4 text-4xl font-bold text-slate-950 dark:text-white">{data?.PublicLike[0]?.totalLikes || 0}</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
                            <span>Public Liked your lessons</span>
                        </div>
                    </article>
                </section>

                <section className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
                    <div className="space-y-6">
                        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 p-6 shadow">
                            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Lesson growth</h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Recent lesson creation activity</p>
                            <div className="mt-4">
                                <GrowthChart data={UserContributorsResult} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 p-6 shadow">
                            <h2 className="text-2xl font-semibold  ">Top contributors</h2>
                            <p className="mt-1 text-sm  ">Most active creators this week</p>

                            <div className="mt-6 space-y-3">
                                {topContributors.length > 0 ? (
                                    topContributors.map((contributor, index) => (
                                        <div key={contributor._id || index} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800/80 dark:bg-slate-900/80">
                                            <div className="flex items-center justify-between gap-4">
                                                <div>
                                                    <p className="text-lg font-semibold  ">{contributor.userName}</p>
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

                        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 p-6 shadow">
                            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Quick actions</h2>
                            <div className="mt-4 space-y-3 gap-1 flex flex-col">
                                <Link href='/profile' >
                                    <button className="w-full rounded-xl border border-slate-200 dark:border-slate-800 py-3">View My Profile</button>
                                </Link>
                                <Link href='/user/dashboard/add-lesson' >
                                    <button className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 py-3 text-white font-semibold">Add New Lesson</button>
                                </Link>
                                <Link href='/user/dashboard/my-lessons' >
                                    <button className="w-full rounded-xl border border-slate-200 dark:border-slate-800 py-3">Manage My Lessons</button>
                                </Link>
                                <Link href='/user/dashboard/my-favorites' >
                                    <button className="w-full rounded-xl border border-slate-200 dark:border-slate-800 py-3">View My Favorites</button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default DashBoardPage;