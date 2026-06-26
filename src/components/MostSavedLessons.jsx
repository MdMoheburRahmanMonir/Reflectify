"use client"

import { motion } from "framer-motion";
import { CiBookmarkCheck } from "react-icons/ci";
import Link from "next/link";
import { SessionClient } from "@/lib/actions/sessionClient";
import { FaLock } from "react-icons/fa";

export default function MostSavedLessons({ MostSaveLesson }) {
    const session = SessionClient();
    const lessons = Array.isArray(MostSaveLesson) && MostSaveLesson.length > 0 ? MostSaveLesson.slice(0, 3) : [];

    return (
        <section className="relative w-full py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
            <div className="absolute -top-20 left-10 w-72 h-72 bg-purple-400/20 dark:bg-purple-500/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-20 right-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 blur-3xl rounded-full" />

            <div className="max-w-7xl mx-auto px-5 md:px-10 relative">
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold dark:bg-violet-500/10 dark:text-violet-200">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <CiBookmarkCheck />
                        </motion.div>
                        Most Saved Lessons
                    </span>

                    <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">
                        Learn From The Community’s <span className="from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent truncate bg-linear-to-l"> Most Saved Lessons </span>
                    </h2>

                    <p className="mt-4 max-w-2xl mx-auto text-sm text-slate-600 dark:text-slate-300">
                        These lessons are the most valued by Reflectify learners — styled cleanly and mapped directly from the saved lessons data.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {lessons.map((lesson, index) => {
                        const imageUrl = lesson.lessonPhoto || lesson.image || "https://i.ibb.co/placeholder.jpg";
                        const title = lesson.title || lesson.lessonTitle || "Untitled Lesson";
                        const description = lesson.description || lesson.summary || "A thoughtful life lesson to explore.";
                        const accessLevel = lesson.accessLevel?.toUpperCase() || "FREE";

                        return (
                            <motion.article
                                key={lesson._id || index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-slate-900/10 shadow-xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-950/90"
                            >
                                {session?.user?.plan === 'free' && lesson.accessLevel === 'premium' && <div className="absolute flex flex-col gap-3 justify-center items-center text-center top-0 left-0 w-full h-full bg-gray-500/20 backdrop-blur-2xl   shadow shadow-md shadow-white/70 dark:shadow-black z-20">
                                    <FaLock className="text-4xl text-white" />
                                    <p className="text-white text-lg">Please unlock to go premium</p>
                                    <Link
                                        href="/plans"
                                        className="text-md font-medium px-4 py-1 rounded-full bg-purple-600 text-purple-50 hover:bg-purple-700 transition-colors"
                                    >
                                        Upgrade to Premium ✦
                                    </Link>
                                </div>}


                                {!session?.user && lesson.accessLevel === 'premium' &&
                                    <div className="absolute flex flex-col gap-3 justify-center items-center text-center top-0 left-0 w-full h-full bg-gray-500/20 backdrop-blur-2xl   shadow shadow-md shadow-white/70 dark:shadow-black z-20">
                                        <FaLock className="text-4xl text-white" />
                                        <p className="text-white text-lg">Please unlock to go premium</p>
                                        <Link
                                            href="/login"
                                            className="text-md font-medium px-4 py-1 rounded-full bg-purple-600 text-purple-50 hover:bg-purple-700 transition-colors"
                                        >
                                            Login First
                                        </Link>
                                    </div>
                                }


                                <div className="absolute inset-0">
                                    <img
                                        src={imageUrl}
                                        alt={title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                                </div>

                                <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8 text-white">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="rounded-full bg-purple-500/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                                            Most Saved
                                        </span>
                                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-white/80">
                                            {accessLevel}
                                        </span>
                                    </div>

                                    <div className="mt-10">
                                        <h3 className="text-2xl font-semibold leading-tight">{title}</h3>
                                        <p className="mt-4 text-sm leading-relaxed text-slate-200/90 line-clamp-3">
                                            {description}
                                        </p>
                                    </div>

                                    <div className="mt-8 flex items-center justify-between gap-4">
                                        <Link href={`/lesson-details/${lesson._id}`} className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 dark:bg-slate-200 dark:text-slate-950">
                                            View Lesson
                                        </Link>
                                        <span className="text-xs uppercase tracking-[0.18em] text-white/70">
                                            {lesson.lessonCategory || lesson.category || "Life"}
                                        </span>
                                    </div>
                                </div>
                            </motion.article>
                        );
                    })}

                    {lessons.length === 0 && (
                        <div className="col-span-full rounded-[32px] border border-dashed border-slate-300/80 bg-white/80 p-12 text-center text-slate-600 shadow-sm dark:border-slate-700/80 dark:bg-slate-950/80 dark:text-slate-300">
                            No saved lessons available yet.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
