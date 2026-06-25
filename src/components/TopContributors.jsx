"use client";

import { motion } from "framer-motion";
import { FaTrophy, FaBookOpen } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const getInitials = (name) =>
    String(name || "")
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .toUpperCase();

const normalizeContributors = (contributors = []) =>
    Array.isArray(contributors)
        ? contributors.map((user, index) => ({
              _id: user._id || index,
              userName: user.userName || user.name || "Unknown",
              category: user.category || "Contributor",
              userImage: user.userImage || user.avatar || "",
              lessonCount: user.lessonCount ?? user.lessons ?? 0,
          }))
        : [];

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const item = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

export default function TopContributors({ TopContributors }) {
    return (
        <section className="relative py-24 px-5 overflow-hidden bg-gradient-to-b from-white via-violet-50/50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

            {/* Background Blur */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400/20 blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400/20 blur-[120px]" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-14"
                >
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                            }}
                        >
                            <FaTrophy />
                        </motion.div>
                        Weekly Leaders
                    </span>

                    <h2 className="mt-5 text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                        Top{" "}
                        <span className="bg-gradient-to-r from-purple-500  to-blue-600 bg-clip-text text-transparent">
                            Contributors
                        </span>
                    </h2>

                    <p className="mt-5 text-slate-500 max-w-2xl mx-auto">
                        Meet the amazing people sharing valuable lessons and inspiring
                        others every day.
                    </p>
                </motion.div>

                {/* Contributors */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex justify-center gap-6"
                >
                    {normalizeContributors(TopContributors).map((user, index) => {
                        const topThree =
                            index === 0
                                ? "from-yellow-400/70 to-orange-500/70"
                                : index === 1
                                    ? "from-slate-300/70 to-slate-500/70"
                                    : index === 2
                                        ? "from-amber-500/70 to-yellow-700/70"
                                        : "from-violet-500/70 to-blue-600/70";

                        return (
                            <motion.div
                                key={user._id}
                                variants={item}
                                whileHover={{
                                    y: -10,
                                    scale: 1.03,
                                }}
                                className="group relative w-52"
                            >
                                <div
                                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${topThree} opacity-0 blur-xl transition duration-500 group-hover:opacity-30`}
                                />

                                <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-800 rounded-3xl p-5 text-center shadow-lg">

                                    <div
                                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-bold bg-gradient-to-r ${topThree}`}
                                    >
                                        #{index + 1}
                                    </div>

                                    <motion.div
                                        whileHover={{ rotate: 8 }}
                                        className={`w-20 h-20 mx-auto mt-4 mb-4 rounded-full p-[2px] bg-gradient-to-r ${topThree}`}
                                    >
                                        {user.userImage ? (
                                            <img
                                                src={user.userImage}
                                                alt={user.userName}
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full mb-9 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-lg font-bold text-slate-800 dark:text-white">
                                                {getInitials(user.userName)}
                                            </div>
                                        )}
                                    </motion.div>

                                    <h3 className="font-bold line-clamp-1 text-slate-800 dark:text-white">
                                        {user.userName}
                                    </h3>

                                    <p className="text-xs text-slate-500 mt-1">
                                        {user.category}
                                    </p>

                                    <div className="mt-4 flex justify-center">
                                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                                            <FaBookOpen className="text-violet-500" />
                                            <span className="font-bold">
                                                {user.lessonCount}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-slate-500 mb-5">
                        Share your experiences and become next week's champion.
                    </p>

                    <motion.button
                        whileHover={{
                            scale: 1.05,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        className="px-6 py-2.5 rounded-tl-2xl rounded-br-2xl bg-gradient-to-r from-purple-500 to-blue-600 text-white text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <div className="flex items-center gap-2">
                            <HiSparkles className="text-lg" />
                            Start Contributing
                        </div>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}