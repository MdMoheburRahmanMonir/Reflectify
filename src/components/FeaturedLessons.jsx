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
        <section className="relative w-full py-16 bg-white dark:bg-slate-950 transition-colors duration-300">
            {/* Background Glow */}
            <div className="absolute -top-20 left-10 w-72 h-72 bg-purple-400/20 dark:bg-purple-500/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-20 right-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 blur-3xl rounded-full" />

            <div className="max-w-7xl mx-auto px-5 md:px-10 relative">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                        ⭐ Featured{" "}
                        <span className="bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
                            Life Lessons
                        </span>
                    </h2>

                    <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm md:text-base">
                        Handpicked wisdom from the community, curated by admins to inspire your growth.
                    </p>
                </div>

                {/* Loading State */}
                <div className="grid w-7xl grid-cols-1 md:grid-cols-3 gap-2">
                    {
                        featuredLessonsSeed?.slice(0, 6).map((lesson, index) => {
                            return (
                                <motion.div
                                    key={lesson._id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="group opacity-5 blur-2x relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5"
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

                                    {/* Image Background */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={lesson.lessonPhoto || "https://i.ibb.co/placeholder.jpg"}
                                            alt={lesson.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                                    </div>

                                    {/* Content */}
                                    <div className="relative p-6 flex flex-col justify-between h-72">

                                        {/* Top badges */}
                                        <div className="flex items-center justify-between">
                                            <span className="flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-purple-500/80 text-white border border-purple-400/30">
                                                <FaStar className="text-yellow-400" />
                                                Featured
                                            </span>

                                            <span className="flex bg-linear-to-r from-purple-600/60 to-blue-600/60 items-center gap-1 px-3 py-1 text-xs rounded-full bg-black/30 text-white border border-white/10">
                                                {lesson.accessLevel === 'premium' ? <MdOutlineWorkspacePremium className="text-white" /> : <FaFreeCodeCamp className="text-white" />}
                                                {lesson.accessLevel.toUpperCase()}
                                            </span>
                                        </div>

                                        {/* Text */}
                                        <div>
                                            <h3 className="text-xl font-bold text-white line-clamp-2">
                                                {lesson.title}
                                            </h3>

                                            <p className="text-sm text-white/80 mt-2 line-clamp-2">
                                                {lesson.description}
                                            </p>
                                        </div>

                                        {/* Bottom actions */}
                                        <div className="flex items-center justify-between mt-4">

                                            <div className="flex items-center gap-2 text-white/80 text-sm">
                                                <LikeButton lesson={lesson} session={session} />
                                                <SavedButton lesson={lesson} session={session} />
                                            </div>

                                            <Link href={`/lesson-details/${lesson._id}`} >
                                                <button className="px-3 py-[5px] rounded-tl-2xl rounded-br-2xl bg-gradient-to-r from-purple-500 to-blue-600 text-white text-xs font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200">
                                                    View Details
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