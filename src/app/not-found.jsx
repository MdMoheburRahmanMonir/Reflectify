"use client";

import React from "react";
import Lottie from "lottie-react";
import Page404 from "./Error404Page.json";
import Link from "next/link";

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0b0f19] transition-colors duration-300">

            {/* Full Width Card */}
            <div className="w-11/12 max-w-7xl mx-auto rounded-3xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-xl bg-white/70 dark:bg-white/5 backdrop-blur-xl">

                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 p-6 md:p-12">

                    {/* LEFT - Lottie */}
                    <div className="w-full flex justify-center">
                        <div className="w-full max-w-md  ">
                            <Lottie animationData={Page404} loop={true} />
                        </div>
                    </div>

                    {/* RIGHT - Content */}
                    <div className="text-center md:text-left">

                        <h1 className="text-5xl relative md:text-6xl font-bold text-gray-900 dark:text-white">
                            4O<span className="rotate-180 top-1 absolute">4</span>
                        </h1>

                        <h2 className="text-xl md:text-2xl font-semibold mt-2 text-gray-700 dark:text-gray-300">
                            Page Not Found
                        </h2>

                        <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-md">
                            The page you’re looking for doesn’t exist, was removed, or the link is broken.
                            Please check the URL or go back to the homepage.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-8 md:justify-start justify-center">

                            <button
                                onClick={() => window.history.back()}
                                className="px-6 py-2.5 rounded-tl-2xl rounded-br-2xl bg-gradient-to-r from-purple-500 to-blue-600 text-white text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200"
                            >
                                ← Go Back
                            </button>

                            <Link
                                href="/"
                                className="px-6 py-2.5 rounded-tl-2xl rounded-br-2xl bg-gradient-to-r from-purple-500 to-blue-600 text-white text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200"
                            >
                                Back to Home
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;