"use client";

import React from 'react';
import { FaBookmark, FaLock, FaStar, FaFreeCodeCamp, FaRegBookmark } from "react-icons/fa";
import { motion } from "framer-motion";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { SessionClient } from '@/lib/actions/sessionClient';
import SavedButton from './SavedButton';

export default function FeaturedLessons({ featuredLessonsSeed }) {
    const session = SessionClient();
    return (
        <section className="relative w-full py-8 sm:py-12 md:py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
            {/* Background Glow */}
            <div className="absolute -top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-purple-400/20 dark:bg-purple-500/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-20 right-5 sm:right-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-400/20 dark:bg-blue-500/10 blur-3xl rounded-full" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative">

                {/* Header */}
                <div className="text-center mb-8 sm:mb-10 md:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                        ⭐ Featured{" "}
                        <span className="bg-linear-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
                            Life Lessons
                        </span>
                    </h2>

                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 px-2">
                        Handpicked wisdom from the community, curated by admins to inspire your growth.
                    </p>
                </div>

                {/* Loading State */}
                <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                    {
                        featuredLessonsSeed?.slice(0, 6).map((lesson, index) => {
                            return (
                                <motion.div
                                    key={lesson._id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="group opacity-5 blur-2x relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:shadow-2xl transition-shadow duration-300"
                                >

                                    {session?.user?.plan === 'free' && lesson.accessLevel === 'premium' && <div className="absolute flex flex-col gap-2 sm:gap-3 justify-center items-center text-center top-0 left-0 w-full h-full bg-gray-500/20 backdrop-blur-2xl shadow-md shadow-white/70 dark:shadow-black z-20">
                                        <FaLock className="text-3xl sm:text-4xl text-white" />
                                        <p className="text-white text-sm sm:text-base md:text-lg px-2">Please unlock to go premium</p>
                                        <Link
                                            href="/plans"
                                            className="text-xs sm:text-sm md:text-md font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-purple-600 text-purple-50 hover:bg-purple-700 transition-colors"
                                        >
                                            Upgrade to Premium ✦
                                        </Link>
                                    </div>}


                                    {!session?.user && lesson.accessLevel === 'premium' &&
                                        <div className="absolute flex flex-col gap-2 sm:gap-3 justify-center items-center text-center top-0 left-0 w-full h-full bg-gray-500/20 backdrop-blur-2xl shadow-md shadow-white/70 dark:shadow-black z-20">
                                            <FaLock className="text-3xl sm:text-4xl text-white" />
                                            <p className="text-white text-sm sm:text-base md:text-lg px-2">Please unlock to go premium</p>
                                            <Link
                                                href="/login"
                                                className="text-xs sm:text-sm md:text-md font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-purple-600 text-purple-50 hover:bg-purple-700 transition-colors"
                                            >
                                                Login First
                                            </Link>
                                        </div>
                                    }

                                    {/* Image Background */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={lesson.lessonPhoto || "https://i.ibb.co/placeholder.jpg"}
                                            alt={lesson.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative p-3 sm:p-4 md:p-6 flex flex-col justify-between h-56 sm:h-64 md:h-72">

                                        {/* Top badges */}
                                        <div className="flex items-center justify-between gap-1 sm:gap-2">
                                            <span className="flex items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1 text-xs sm:text-xs rounded-full bg-purple-500/80 text-white border border-purple-400/30 truncate">
                                                <FaStar className="text-yellow-400 shrink-0" />
                                                <span className="hidden sm:inline">Featured</span>
                                                <span className="sm:hidden">🔥</span>
                                            </span>

                                            <span className="flex bg-linear-to-r from-purple-600/60 to-blue-600/60 items-center gap-0.5 sm:gap-1 px-2 sm:px-3 py-1 text-xs sm:text-xs rounded-full bg-black/30 text-white border border-white/10 shrink-0">
                                                {lesson.accessLevel === 'premium' ? <MdOutlineWorkspacePremium className="text-white" /> : <FaFreeCodeCamp className="text-white" />}
                                                <span className="hidden sm:inline">{lesson.accessLevel.toUpperCase()}</span>
                                            </span>
                                        </div>

                                        {/* Text */}
                                        <div>
                                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white line-clamp-2">
                                                {lesson.title}
                                            </h3>

                                            <p className="text-xs sm:text-sm text-white/80 mt-1 sm:mt-2 line-clamp-2">
                                                {lesson.description}
                                            </p>
                                        </div>

                                        {/* Bottom actions */}
                                        <div className="flex items-center justify-between gap-2 mt-3 sm:mt-4">

                                            <div className="flex items-center gap-1 sm:gap-2 text-white/80 text-sm">
                                                <LikeButton lesson={lesson} session={session} />
                                                <SavedButton lesson={lesson} session={session} />

                                            </div>

                                            <Link href={`/lesson-details/${lesson._id}`} >
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center gap-2 rounded-tr-2xl rounded-bl-2xl border border-neutral-300 bg-linear-to-r from-purple-500 to-blue-500 text-white px-4 py-1.5 text-xs font-medium shadow-sm transition hover:border-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:opacity-70"
                                                >
                                                    View
                                                </button>

                                            </Link>
                                        </div>

                                    </div>
                                </motion.div>
                            )
                        })
                    }
                </div>
            </div>
        </section >
    );
}