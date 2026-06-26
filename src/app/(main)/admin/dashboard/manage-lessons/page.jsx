import React from 'react';
import ManageLesson from './ManageLesson';
import { userSessionServer } from '@/lib/actions/session';
import { GetLessonDataToShow } from '@/lib/api/adminApi/LessonManaging/GetLessonDataToShow';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import NavigationDrowerForAdmin from '@/components/adminDashboard/DrowerAdmin';

const ManageLessonPage = async () => {
    const { token } = await auth.api.getToken({ headers: await headers() });
    const session = await userSessionServer()
    const lessons = await GetLessonDataToShow(session, token);

    return (
        <main>
            <NavigationDrowerForAdmin />
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
                </div>
            </section>
            <ManageLesson lessons={lessons} token={token} />
        </main>
    );
};

export default ManageLessonPage;