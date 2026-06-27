'use client'
import NavigationDrowerProfile from "@/components/profilepage/NavigationDrowerProfile";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import { LuImagePlus } from "react-icons/lu";

const PublicUserProfile = ({ featuredLessons, publicSessionData, coverPhoto, TotalLessonCreated }) => {
    const { data: session } = authClient.useSession();
    console.log(publicSessionData, 'public data id ');

    const user = publicSessionData[0];


    return (
        <div className="min-h-screen w-11/12 mx-auto bg-base-200 py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-6">
            <NavigationDrowerProfile />
            <div className="max-w-7xl mx-auto">
                {/* Profile Card */}
                <div className="bg-base-100 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden">
                    {/* Cover */}
                    <div
                        style={{
                            backgroundImage: coverPhoto
                                ? `url(${coverPhoto})`
                                : undefined,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        className="relative pt-6 sm:pt-8 md:pt-10 z-10 h-32 sm:h-40 md:h-52 lg:h-64 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    >
                      
                        <div className="absolute bottom-4 left-4 flex flex-col gap-2 items-start">
                            <span
                                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold shadow-sm ${user?.role === "admin"
                                        ? "bg-red-100 text-red-600 border border-red-200"
                                        : "bg-white/90 text-blue-600 border border-blue-200"
                                    }`}
                            >
                                {user?.role === "admin" ? "👑 Admin" : "✨ Community Member"}
                            </span>

                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/90 text-purple-700 border border-purple-200 shadow-sm">
                                📚 {TotalLessonCreated} Lessons by {user?.name}
                            </span>
                        </div> 
                         
                    </div>

                    <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 ">
                        {/* Avatar */}
                        <div className="-mt-16 sm:-mt-20 md:-mt-24 flex flex-col items-center ">
                            <img
                                src={
                                    user?.image ||
                                    "https://i.ibb.co/4pDNDk1/avatar.png"
                                }
                                alt={user?.name}
                                className="w-24 sm:w-28 md:w-32 lg:w-36 z-20 h-24 sm:h-28 md:h-32 lg:h-36 rounded-full border-3 sm:border-4 bg-black/20 backdrop-blur-2xl border-white object-cover shadow-md sm:shadow-lg"
                            />

                            <h1 className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center">
                                {user?.name}
                            </h1>

                            <p className="text-xs sm:text-sm md:text-base text-black dark:text-white mt-1 sm:mt-2 break-all">{user?.email}</p>

                            <div className="mt-2 sm:mt-3">
                                <span
                                    className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${user?.role === "admin"
                                        ? "bg-red-100 text-red-600"
                                        : "bg-blue-100 text-blue-600"
                                        }`}
                                >
                                    {user?.role === "admin"
                                        ? "👑 Admin"
                                        : "✨ Community Member"}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-6 sm:mt-8 max-w-3xl mx-auto text-center px-2 sm:px-4">
                            {user?.role === "admin"
                                ? <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4">
                                    Administrator Overview
                                </h2>
                                : <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4">
                                    About This Journey
                                </h2>
                            }
                            {user?.role === "admin"
                                ? <p className="text-sm sm:text-base text-gray-800 dark:text-gray-300 leading-relaxed">
                                    This profile belongs to a platform administrator dedicated to fostering a safe, inspiring, and knowledge-driven community. Through moderation and community support, they help ensure that meaningful life lessons reach the people who need them most.
                                </p>
                                : <p className="text-sm sm:text-base text-gray-800 dark:text-gray-300 leading-relaxed">
                                    Every life lesson tells a story. This profile represents a unique journey of growth, experiences, challenges, and wisdom gathered through life. By sharing meaningful lessons, we inspire others to learn, reflect, and become better versions of themselves.
                                </p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-10">
                <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-md shadow-slate-200/40 dark:border-slate-700 dark:bg-slate-950/95">
                    <div className="mb-8 flex flex-col gap-4 sm:justify-between">
                        <div>
                            <p className=" uppercase font-bold text-2xl text-slate-500 dark:text-slate-400"> {user?.name}'s Public Posts</p>

                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            A curated list of public lessons styled like featured cards.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
                        {featuredLessons.map((lesson) => (
                            <article
                                key={lesson._id}
                                className="group overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-950"
                            >
                                <div className="relative h-56 overflow-hidden bg-slate-200">
                                    <img
                                        src={lesson.lessonPhoto}
                                        alt={lesson.title}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 via-transparent to-transparent" />
                                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-900">
                                        {lesson.accessLevel}
                                    </span>
                                </div>
                                <div className="p-5 bg-linear-to-t from-purple-600 to-blue-600/70">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
                                            {lesson.category}
                                        </span>
                                        <span className="rounded-full bg-indigo-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                                            {lesson.date}
                                        </span>
                                    </div>
                                    <h3 className="mt-4 text-xl font-semibold text-white">
                                        {lesson.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-6 text-white line-clamp-3">
                                        {lesson.description}
                                    </p>
                                    <div className="mt-5 flex items-center justify-between text-sm text-white ">
                                        <span>{lesson.likes || 0} likes</span>
                                        <Link href={`/lesson-details/${lesson._id}`} >
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-tr-2xl rounded-bl-2xl border border-neutral-300 bg-linear-to-r from-purple-500 to-blue-500 text-white px-4 py-1.5 text-xs font-medium shadow-sm transition hover:border-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:opacity-70"
                                            >
                                                View Details
                                            </button>

                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PublicUserProfile; 