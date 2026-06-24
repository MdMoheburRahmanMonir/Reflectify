"use client"

import { useState } from "react";
import { FaHeart, FaRegHeart, FaBookmark, FaRegBookmark  } from "react-icons/fa";
import { motion } from "framer-motion";
import { CiBookmarkCheck } from "react-icons/ci";

const dummyLessons = [
    {
        _id: "1",
        title: "Failure taught me more than success",
        category: "Personal Growth",
        emotionalTone: "Realization",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        favoritesCount: 342,
        likesCount: 120,
        isLiked: false,
        isSaved: false,
    },
    {
        _id: "2",
        title: "Letting go changed everything",
        category: "Mindset",
        emotionalTone: "Peace",
        image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335",
        favoritesCount: 510,
        likesCount: 300,
        isLiked: false,
        isSaved: false,
    },
    {
        _id: "3",
        title: "Hard times build soft hearts",
        category: "Life",
        emotionalTone: "Motivational",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        favoritesCount: 289,
        likesCount: 180,
        isLiked: false,
        isSaved: false,
    },
];

export default function MostSavedLessons() {
    const [lessons, setLessons] = useState(dummyLessons); 
    console.log(lessons);
    
    const toggleLike = (id) => {
        console.log(id);
        
        setLessons((prev) =>
            prev.map((item) =>
                item._id === id
                    ? {
                        ...item,
                        isLiked: !item.isLiked,
                        likesCount: item.isLiked ? item.likesCount - 1 : item.likesCount + 1,
                    }
                    : item
            )
        );
    };

    const toggleSave = (id) => {
        setLessons((prev) =>
            prev.map((item) =>
                item._id === id
                    ? {
                        ...item,
                        isSaved: !item.isSaved,
                        favoritesCount: item.isSaved
                            ? item.favoritesCount - 1
                            : item.favoritesCount + 1,
                    }
                    : item
            )
        );
    };

    return (
        <section className="relative w-11/12 max-w-7xl mx-auto py-16 px-4  "> 
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400/40 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400/40 blur-[120px]" />
            {/* Header */}
            <div className="text-center mb-10">
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold">
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 2,
                        }}
                    >
                        <CiBookmarkCheck />
                    </motion.div>
                   Most Saved Lessons
                </span>
                <h2 className="text-5xl font-bold bg-gradient-to-l from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"><span className="text-yellow-500">⭐ </span><span className="text-black dark:text-white ">Most Saved</span>  Lessons</h2>
                <p className="text-gray-500 mt-2">
                    Community’s most loved life lessons
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lessons.map((lesson, index) => (
                    <motion.div
                        key={lesson._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative h-[320px] rounded-2xl overflow-hidden shadow-lg group"
                    >
                        {/* Background Image */}
                        <img
                            src={lesson.image}
                            alt={lesson.title}
                            className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition duration-500"
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition"></div>

                        {/* Content */}
                        <div className="relative z-10 p-5 h-full flex flex-col justify-between text-white">
                            {/* Top Badges */}
                            <div className="flex justify-between items-start">
                                <span className="text-xs bg-white/20 px-2 py-1 rounded-full backdrop-blur">
                                    🔥 {lesson.favoritesCount} saved
                                </span>

                                <div className="flex gap-3">
                                    <button onClick={() => toggleLike(lesson._id)}>
                                        {lesson.isLiked ? (
                                            <FaHeart className="text-red-400" />
                                        ) : (
                                            <FaRegHeart />
                                        )}
                                    </button>

                                    <button onClick={() => toggleSave(lesson._id)}>
                                        {lesson.isSaved ? (
                                            <FaBookmark className="text-yellow-300" />
                                        ) : (
                                            <FaRegBookmark />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Middle Text */}
                            <div>
                                <h3 className="text-lg font-semibold leading-snug">
                                    {lesson.title}
                                </h3>

                                <p className="text-xs text-gray-200 mt-2">
                                    {lesson.category} • {lesson.emotionalTone}
                                </p>
                            </div>

                            {/* Bottom Stats */}
                            <div className="flex justify-between text-sm text-gray-200">
                                <span>❤️ {lesson.likesCount}</span>
                                <span>⭐ Most Saved</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}