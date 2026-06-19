"use client";

import { useEffect, useState } from "react";
import { FaHeart, FaBookmark, FaLock, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function FeaturedLessons() {
    const featuredLessonsSeed = [
        {
            _id: "fl1",
            title: "Failure is a Hidden Teacher",
            description:
                "Every failure carries a lesson that success never teaches. Learn to reflect, not regret, and turn mistakes into lifelong wisdom.",
            image:
                "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
            category: "Mindset",
            emotionalTone: "Motivational",
            likesCount: 245,
            savedCount: 98,
            isFeatured: true,
        },
        {
            _id: "fl2",
            title: "Peace Begins With Self Acceptance",
            description:
                "You cannot change your past, but you can change how you see it. Accept yourself fully and peace will follow naturally.",
            image:
                "https://images.unsplash.com/photo-1506784365847-bbad939e9335",
            category: "Personal Growth",
            emotionalTone: "Calm",
            likesCount: 310,
            savedCount: 140,
            isFeatured: true,
        },
        {
            _id: "fl3",
            title: "Discipline Creates Freedom",
            description:
                "True freedom is not doing everything you want, but doing what you should consistently until it becomes your identity.",
            image:
                "https://images.unsplash.com/photo-1526401485004-2fda9f3e3b92",
            category: "Career",
            emotionalTone: "Motivational",
            likesCount: 520,
            savedCount: 210,
            isFeatured: true,
        },
        {
            _id: "fl4",
            title: "Not Everyone Deserves Access to You",
            description:
                "Protect your energy. Access to your time and emotions should be earned, not freely given to everyone.",
            image:
                "https://images.unsplash.com/photo-1517832207067-4db24a2ae47c",
            category: "Relationships",
            emotionalTone: "Realization",
            likesCount: 430,
            savedCount: 190,
            isFeatured: true,
        },
        {
            _id: "fl5",
            title: "Consistency Beats Motivation",
            description:
                "Motivation fades, but consistency builds results. Show up even when you don’t feel like it.",
            image:
                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
            category: "Productivity",
            emotionalTone: "Motivational",
            likesCount: 610,
            savedCount: 275,
            isFeatured: true,
        },
        {
            _id: "fl6",
            title: "Your Thoughts Shape Your Reality",
            description:
                "What you repeatedly think becomes your belief system. Change your thoughts, and you change your life.",
            image:
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
            category: "Mindset",
            emotionalTone: "Inspirational",
            likesCount: 390,
            savedCount: 160,
            isFeatured: true,
        },
    ];
    const [lessons, setLessons] = useState(featuredLessonsSeed);
 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace with your real API
        const fetchData = async () => {
            try {
                const res = await fetch("/api/featured-lessons");
                const data = await res.json();
                setLessons(data || []);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-60 rounded-2xl bg-slate-100 dark:bg-white/5 animate-pulse"
                            />
                        ))}
                    </div>
                ) : (
                    /* Grid */
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {lessons.map((lesson, index) => (
                            <motion.div
                                key={lesson._id || index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="group relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5"
                            >

                                {/* Image Background */}
                                <div className="absolute inset-0">
                                    <img
                                        src={lesson.image || "https://i.ibb.co/placeholder.jpg"}
                                        alt={lesson.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                                </div>

                                {/* Content */}
                                <div className="relative p-6 flex flex-col justify-between h-72">

                                    {/* Top badges */}
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30">
                                            <FaStar className="text-yellow-400" />
                                            Featured
                                        </span>

                                        <span className="flex items-center gap-1 px-3 py-1 text-xs rounded-full bg-black/30 text-white border border-white/10">
                                            <FaLock className="text-white/70" />
                                            Premium
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

                                        <div className="flex items-center gap-4 text-white/80 text-sm">
                                            <span className="flex items-center gap-1">
                                                <FaHeart className="text-pink-400" />
                                                {lesson.likesCount || 0}
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <FaBookmark className="text-blue-400" />
                                                {lesson.savedCount || 0}
                                            </span>
                                        </div>

                                        <button className="px-6 py-2.5 rounded-tl-2xl rounded-br-2xl bg-gradient-to-r from-purple-500 to-blue-600 text-white text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200">
                                            View Details
                                        </button>
                                    </div>

                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}