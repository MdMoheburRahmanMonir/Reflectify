import GrowthChart from '@/components/adminDashboard/GrowthChart';
import Link from "next/link";
import { AdminDashboardFullData } from "@/lib/api/userapi/Dashboard/AdminDashboardFullData";
import { userSessionServer } from "@/lib/actions/session";
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import NavigationDrower from '@/components/userDashboard/NavigationDrower';

const DashBoardPage = async () => {
    const { token } = await auth.api.getToken({ headers: await headers() });
    const session = await userSessionServer();
    const data = await AdminDashboardFullData(session, token);
    console.log(data);

    const topContributors = data?.topContributors ?? [];
    const UserContributorsResult = data?.Average ?? [];

    return (
        // এখানে w-full এবং overflow-x-hidden নিশ্চিত করা হয়েছে যাতে কোনো কন্টেন্ট স্ক্রিন ঠেলে ডানে সরাতে না পারে
        <main className="w-full min-h-screen p-4 sm:p-6 md:p-8 dark:text-white overflow-x-hidden">
            <NavigationDrower />
            <div className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8">

                {/* Header Section */}
                <header className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-purple-500 to-blue-600 p-6 sm:p-8 shadow-2xl text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-white/90">User overview</p>
                            <h1 className="mt-2 text-2xl sm:text-3xl font-bold">Your dashboard</h1>
                            <p className="mt-2 text-xs sm:text-sm text-white/80 max-w-xl">A focused view of your lessons, progress, and activity on Reflectify.</p>
                        </div>
                    </div>
                </header>

                {/* Stats Cards Section */}
                <section className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
                    {/* Total Lesson Created */}
                    <article className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white/90 p-5 sm:p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-200/50 transition lg:hover:-translate-y-1 dark:border-slate-800/70 dark:bg-slate-950/90 dark:shadow-slate-950/40 dark:ring-slate-800/70">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                    Total Lesson Created
                                </p>
                                <p className="mt-2 sm:mt-4 text-3xl sm:text-4xl font-bold">{data.totalLessonCreated}</p>
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-6 flex items-center justify-between gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                            <span>In this week you have created {data.totalLessonCreated} lessons</span>
                        </div>
                    </article>

                    {/* Total Saved Lesson */}
                    <article className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white/90 p-5 sm:p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-200/50 transition lg:hover:-translate-y-1 dark:border-slate-800/70 dark:bg-slate-950/90 dark:shadow-slate-950/40 dark:ring-slate-800/70">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                    Total Saved Lesson
                                </p>
                                <p className="mt-2 sm:mt-4 text-3xl sm:text-4xl font-bold">{data.TotalSavedLesson}</p>
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-6 flex items-center justify-between gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                            <span>Lessons you have saved</span>
                        </div>
                    </article>

                    {/* Public Likes */}
                    <article className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-white/90 p-5 sm:p-6 shadow-xl shadow-slate-200/40 ring-1 ring-slate-200/50 transition lg:hover:-translate-y-1 dark:border-slate-800/70 dark:bg-slate-950/90 dark:shadow-slate-950/40 dark:ring-slate-800/70">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                                    Public Likes
                                </p>
                                <p className="mt-2 sm:mt-4 text-3xl sm:text-4xl font-bold">{data?.PublicLike[0]?.totalLikes || 0}</p>
                            </div>
                        </div>
                        <div className="mt-4 sm:mt-6 flex items-center justify-between gap-4 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                            <span>Public Liked your lessons</span>
                        </div>
                    </article>
                </section>

                {/* Growth and Contributor Split Section */}
                <section className="grid gap-6 grid-cols-1 xl:grid-cols-[1.55fr_1fr]">
                    {/* Lesson Growth Chart Container */}
                    <div className="w-full space-y-6 overflow-hidden">
                        <div className="rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 p-5 sm:p-6 shadow">
                            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">Lesson growth</h2>
                            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">Recent lesson creation activity</p>
                            <div className="mt-4 w-full overflow-x-auto">
                                <GrowthChart data={UserContributorsResult} />
                            </div>
                        </div>
                    </div>

                    {/* Right Side Column (Top Contributors & Quick Actions) */}
                    <div className="w-full space-y-6">
                        {/* Top Contributors Card */}
                        <div className="rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 p-5 sm:p-6 shadow">
                            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">Top contributors</h2>
                            <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">Most active creators this week</p>

                            <div className="mt-6 space-y-3">
                                {topContributors.length > 0 ? (
                                    topContributors.map((contributor, index) => (
                                        <div key={contributor._id || index} className="rounded-xl sm:rounded-2xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800/80 dark:bg-slate-900/80">
                                            <div className="flex items-center justify-between gap-4">
                                                <div>
                                                    <p className="text-base sm:text-lg font-semibold">{contributor.userName}</p>
                                                    <p className="mt-0.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400">Lessons: {contributor.lessonCount}</p>
                                                </div>
                                                <div className="rounded-full bg-slate-100 px-2.5 py-1 text-xs sm:text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                                    #{index + 1}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="rounded-xl sm:rounded-2xl border border-slate-200/80 bg-slate-50 p-4 dark:border-slate-800/80 dark:bg-slate-900/80">
                                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">No contributor data available.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions Card */}
                        <div className="rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 p-5 sm:p-6 shadow">
                            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white">Quick actions</h2>
                            <div className="mt-4 space-y-3 flex flex-col w-full">
                                <Link href='/profile' className="w-full">
                                    <button className="w-full text-sm sm:text-base rounded-xl border border-slate-200 dark:border-slate-800 py-2.5 sm:py-3 transition hover:bg-slate-50 dark:hover:bg-slate-900">View My Profile</button>
                                </Link>
                                <Link href='/user/dashboard/add-lesson' className="w-full">
                                    <button className="w-full text-sm sm:text-base rounded-xl bg-gradient-to-r from-purple-500 to-blue-600 py-2.5 sm:py-3 text-white font-semibold shadow-lg shadow-purple-500/20">Add New Lesson</button>
                                </Link>
                                <Link href='/user/dashboard/my-lessons' className="w-full">
                                    <button className="w-full text-sm sm:text-base rounded-xl border border-slate-200 dark:border-slate-800 py-2.5 sm:py-3 transition hover:bg-slate-50 dark:hover:bg-slate-900">Manage My Lessons</button>
                                </Link>
                                <Link href='/user/dashboard/my-favorites' className="w-full">
                                    <button className="w-full text-sm sm:text-base rounded-xl border border-slate-200 dark:border-slate-800 py-2.5 sm:py-3 transition hover:bg-slate-50 dark:hover:bg-slate-900">View My Favorites</button>
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