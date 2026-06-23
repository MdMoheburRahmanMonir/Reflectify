import React from 'react';
import ManageLesson from './ManageLesson';
import Link from 'next/link';
import { FiShield } from 'react-icons/fi';
import { userSessionServer } from '@/lib/actions/session';
import { GetLessonDataToShow } from '@/lib/api/adminApi/LessonManaging/GetLessonDataToShow';

const ManageLessonPage = async () => {
    const session = await userSessionServer()
    const lessons = await GetLessonDataToShow(session);
    console.log(session, 'lesson is : - ', lessons);

    return (
        <main>
            <section className="rounded-[32px] border border-slate-200/70 bg-white/90 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
                            Admin / Manage lessons
                        </p>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                            Lesson moderation dashboard
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                            Review all lessons, mark featured content, resolve flagged items, and keep the public library safe.
                        </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                        <Link
                            href="/admin/dashboard/reported-lessons"
                            className="inline-flex items-center justify-center gap-2 rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
                        >
                            <FiShield className="h-5 w-5" />
                            Go to reported lessons
                        </Link>
                        <Link
                            href="/admin/dashboard/manage-users"
                            className="inline-flex items-center justify-center gap-2 rounded-3xl px-5 py-3 text-sm font-semibold transition hover:border-violet-500 hover:bg-violet-50 shadow-lg shadow-black/10 dark:shadow-white/10 dark:bg-slate-900"
                        >
                            <FiShield className="h-5 w-5" />
                            Manage users
                        </Link>
                    </div>
                </div>
            </section>
            <ManageLesson lessons={lessons}/>
        </main>
    );
};

export default ManageLessonPage;