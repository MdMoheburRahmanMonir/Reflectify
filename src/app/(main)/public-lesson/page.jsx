"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { FaLock, FaStar, FaFreeCodeCamp } from "react-icons/fa";
import { motion } from "framer-motion";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import Link from "next/link";
import LikeButton from "@/components/LikeButton";
import { SessionClient } from '@/lib/actions/sessionClient';
import SavedButton from '@/components/SavedButton';
import { AllLessonForLessonPage } from '@/lib/api/Lesson_Details_page/AllLessonForLessonPage';
import { authClient } from '@/lib/auth-client';
import { RiResetLeftFill } from 'react-icons/ri';

export default function PublicLessonPage({token}) {    
    const { data: session } = authClient.useSession();
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);

    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("");
    const [emotionalTone, setEmotionalTone] = useState("");
    const [accessLevel, setAccessLevel] = useState("");
    const [privacy, setPrivacy] = useState("");

    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await AllLessonForLessonPage();  
                setLessons(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching lessons:", error);
            } finally {
                setLoading(false);
        }
        }
        fetchData();
    }, []);

    const filtered = useMemo(() => {
        return lessons.filter((lesson) => {
            const q = query.toLowerCase();

            if (query) {
                const inText = [lesson.title, lesson.description, lesson.userName]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase()
                    .includes(q);

                if (!inText) return false;
            }

            if (category && lesson.category !== category) return false;
            if (emotionalTone && lesson.emotionalTone !== emotionalTone) return false;
            if (accessLevel && lesson.accessLevel !== accessLevel) return false;
            if (privacy && lesson.privacy !== privacy) return false;

            return true;
        });
    }, [lessons, query, category, emotionalTone, accessLevel, privacy]);

    const paginatedLessons = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return filtered.slice(start, start + itemsPerPage);
    }, [filtered, page]);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    return (
        <main className="min-h-screen px-4 py-12 bg-white dark:bg-slate-950 transition-colors duration-300">
            {/* Background Glow */}
            <div className="absolute -top-20 left-10 w-72 h-72 bg-purple-400/20 dark:bg-purple-500/10 blur-3xl rounded-full" />
            <div className="absolute -bottom-20 right-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 blur-3xl rounded-full" />

            <div className="mx-auto max-w-7xl relative">

                {/* HEADER */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                        ⭐ Explore All{" "}
                        <span className="bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
                            Life Lessons
                        </span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 mt-3 text-sm md:text-base">
                        Discover wisdom shared by our community members. Find lessons that inspire your growth.
                    </p>
                </div>
 
                <div className="mb-10 rounded-3xl border border-white/20 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl shadow-lg p-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-7">

                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search lessons..."
                        className="w-full rounded-2xl px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-purple-400 outline-none lg:col-span-2"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="rounded-2xl px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-purple-400 outline-none"
                    >
                        <option value="">All Categories</option>
                        <option value="mindset">Mindset</option>
                        <option value="health">Health</option>
                        <option value="relationships">Relationships</option>
                        <option value="career">Career</option>
                        <option value="finance">Finance</option>
                        <option value="personal-growth">Personal Growth</option>
                    </select>

                    <select
                        value={emotionalTone}
                        onChange={(e) => setEmotionalTone(e.target.value)}
                        className="rounded-2xl px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-purple-400 outline-none"
                    >
                        <option value="">All Tones</option>
                        <option value="inspiring">Inspiring</option>
                        <option value="sad">Sad</option>
                        <option value="realization">Realization</option>
                        <option value="motivating">Motivating</option>
                        <option value="thoughtful">Thoughtful</option>
                    </select>

                    <select
                        value={accessLevel}
                        onChange={(e) => setAccessLevel(e.target.value)}
                        className="rounded-2xl px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-purple-400 outline-none"
                    >
                        <option value="">All Access</option>
                        <option value="free">Free</option>
                        <option value="premium">Premium</option>
                    </select>

                    <select
                        value={privacy}
                        onChange={(e) => setPrivacy(e.target.value)}
                        className="rounded-2xl px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-purple-400 outline-none"
                    >
                        <option value="">All Privacy</option>
                        <option value="public">Public</option>
                        <option value="privet">Private</option>
                    </select>

                    <button
                        onClick={() => {
                            setQuery("");
                            setCategory("");
                            setEmotionalTone("");
                            setAccessLevel("");
                            setPrivacy("");
                            setPage(1);
                        }}
                        className="rounded-2xl flex justify-center items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold hover:scale-[1.02] transition col-span-1"
                    >
                       <RiResetLeftFill className='size-5'/> Reset
                    </button>
                </div>

                {/* LESSONS GRID */}
                {loading ? (
                    <div className="text-center py-20 text-slate-500">
                        Loading amazing lessons...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {paginatedLessons.map((lesson, index) => (
                            <motion.div
                                key={lesson._id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="group relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:shadow-2xl transition-all duration-300"
                            >

                                {session?.user?.plan === 'free' && lesson.accessLevel === 'premium' && (
                                    <div className="absolute flex flex-col gap-3 justify-center items-center text-center top-0 left-0 w-full h-full bg-gray-500/20 backdrop-blur-2xl shadow-md shadow-white/70 dark:shadow-black z-20">
                                        <FaLock className="text-4xl text-white" />
                                        <p className="text-white text-lg">Please unlock to go premium</p>
                                        <Link
                                            href="/plans"
                                            className="text-md line-clamp-1 font-medium px-4 py-1 rounded-full bg-purple-600 text-purple-50 hover:bg-purple-700 transition-colors"
                                        >
                                            Upgrade to Premium ✦
                                        </Link>
                                    </div>
                                )}

                                {!session?.user && lesson.accessLevel === 'premium' && (
                                    <div className="absolute flex flex-col gap-3 justify-center items-center text-center top-0 left-0 w-full h-full bg-gray-500/20 backdrop-blur-2xl shadow-md shadow-white/70 dark:shadow-black z-20">
                                        <FaLock className="text-4xl text-white" />
                                        <p className="text-white text-lg">Please unlock to go premium</p>
                                        <Link
                                            href="/login"
                                            className="text-md font-medium px-4 py-1 rounded-full bg-purple-600 text-purple-50 hover:bg-purple-700 transition-colors"
                                        >
                                            Login First
                                        </Link>
                                    </div>
                                )}

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
                                            {lesson.category}
                                        </span>

                                        <span className="flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-black/30 text-white border border-white/10">
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

                                        <p className="text-xs text-white/60 mt-2">
                                            By {lesson.userName}
                                        </p>
                                    </div>

                                    {/* Bottom actions */}
                                    <div className="flex items-center justify-between mt-4">

                                        <div className="flex items-center gap-2 text-white/80 text-sm">
                                            <LikeButton lesson={lesson} session={session} />
                                            <SavedButton lesson={lesson} session={session} />
                                        </div>

                                        <Link href={!session?.user ? `/login` : `/lesson-details/${lesson._id}`}>
                                            <button className="px-3 py-[5px] rounded-tl-2xl rounded-br-2xl bg-gradient-to-r from-purple-500 to-blue-600 text-white text-xs font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200">
                                                View Details
                                            </button>
                                        </Link>
                                    </div>

                                </div>
                            </motion.div>
                        ))}

                        {paginatedLessons.length === 0 && (
                            <div className="col-span-full text-center py-10 text-slate-500">
                                No lessons found 😢
                            </div>
                        )}
                    </div>
                )}

                {/* PAGINATION (CLEAN PREMIUM STYLE) */}
                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                        <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/20">

                            <button
                                disabled={page === 1}
                                onClick={() => setPage((p) => p - 1)}
                                className="px-3 py-1 rounded-lg disabled:opacity-40 hover:bg-purple-500/20 transition"
                            >
                                Prev
                            </button>

                            <span className="text-sm font-semibold text-slate-900 dark:text-white">
                                {page} / {totalPages || 1}
                            </span>

                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage((p) => p + 1)}
                                className="px-3 py-1 rounded-lg disabled:opacity-40 hover:bg-purple-500/20 transition"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}