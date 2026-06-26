"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaBrain, FaBookOpen, FaUsers, FaLightbulb } from "react-icons/fa";

const benefits = [
    {
        icon: <FaBrain />,
        title: "Self Awareness",
        desc: "Understand your strengths, weaknesses, and emotions through thoughtful reflection.",
        gradient: "from-violet-500/20 to-purple-600/20",
        lightBg: "bg-violet-50 dark:bg-violet-950/20",
        iconBg: "bg-violet-100 dark:bg-violet-900/30",
        iconColor: "text-violet-600 dark:text-violet-400",
        border: "border-violet-200/30 dark:border-violet-700/20",
        glow: "shadow-violet-200 dark:shadow-violet-900/30",
        accent: "bg-violet-500",
        tag: "Reflection",
    },
    {
        icon: <FaBookOpen />,
        title: "Preserve Wisdom",
        desc: "Document life lessons so your most valuable insights are never lost or forgotten.",
        gradient: "from-emerald-500/20 to-teal-600/20",
        lightBg: "bg-emerald-50 dark:bg-emerald-950/20",
        iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
        iconColor: "text-emerald-600 dark:text-emerald-400",
        border: "border-emerald-200/30 dark:border-emerald-700/20",
        glow: "shadow-emerald-200 dark:shadow-emerald-900/30",
        accent: "bg-emerald-500",
        tag: "Knowledge",
    },
    {
        icon: <FaUsers />,
        title: "Learn From Others",
        desc: "Gain powerful insights from shared real-life experiences within the community.",
        gradient: "from-orange-500/20 to-rose-500/20",
        lightBg: "bg-orange-50 dark:bg-orange-950/20",
        iconBg: "bg-orange-100 dark:bg-orange-900/30",
        iconColor: "text-orange-600 dark:text-orange-400",
        border: "border-orange-200/30 dark:border-orange-700/20",
        glow: "shadow-orange-200 dark:shadow-orange-900/30",
        accent: "bg-orange-500",
        tag: "Community",
    },
    {
        icon: <FaLightbulb />,
        title: "Continuous Growth",
        desc: "Improve your life and mindset through daily reflection and intentional learning.",
        gradient: "from-sky-500/20 to-blue-600/20",
        lightBg: "bg-sky-50 dark:bg-sky-950/20",
        iconBg: "bg-sky-100 dark:bg-sky-900/30",
        iconColor: "text-sky-600 dark:text-sky-400",
        border: "border-sky-200/30 dark:border-sky-700/20",
        glow: "shadow-sky-200 dark:shadow-sky-900/30",
        accent: "bg-sky-500",
        tag: "Growth",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

const headingVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function WhyLifeMatters() {
    return (
        <section className="relative py-24 px-5 md:px-10 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-300">

            {/* Background blobs */}
            <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-violet-400/10 dark:bg-violet-600/10 blur-[100px]" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-sky-400/10 dark:bg-sky-600/10 blur-[100px]" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-emerald-400/5 dark:bg-emerald-600/5 blur-[80px]" />

            <div className="max-w-6xl mx-auto relative">

                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={containerVariants}
                >
                    <motion.div variants={headingVariants}>
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-gradient-to-r from-violet-100 to-sky-100 dark:from-violet-900/40 dark:to-sky-900/40 text-violet-700 dark:text-violet-300 border border-violet-200/50 dark:border-violet-700/30 mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
                            Core Principles
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={headingVariants}
                        className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight"
                    >
                        Why Learning From{" "}
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-purple-600  to-blue-500 bg-clip-text text-transparent">
                                Reflectify
                            </span>
                            {/* Underline accent */}
                            <motion.span
                                className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-gradient-to-r from-violet-500 via-sky-500 to-emerald-500"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                style={{ originX: 0 }}
                            />
                        </span>
                    </motion.h2>

                    <motion.p
                        variants={headingVariants}
                        className="mt-5 text-base  md:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed"
                    >
                        Your experiences are your greatest teacher. Capturing them turns
                        everyday moments into lifelong wisdom.
                    </motion.p>
                </motion.div>

                {/* Cards */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-60px" }}
                    variants={containerVariants}
                >
                    {benefits.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariants}
                            whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
                            className={`
                                group relative rounded-2xl p-6
                                ${item.lightBg}
                                border ${item.border}
                                shadow-lg ${item.glow}
                                overflow-hidden cursor-default
                                transition-shadow duration-300
                                hover:shadow-xl
                            `}
                        >
                            {/* Top gradient strip */}
                            <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${item.gradient} opacity-80`} />

                            {/* Floating number */}
                            <span className="absolute top-4 right-5 text-5xl font-black text-slate-100 dark:text-white/5 select-none leading-none">
                                {String(i + 1).padStart(2, "0")}
                            </span>

                            {/* Icon */}
                            <motion.div
                                className={`w-14 h-14 rounded-xl flex mx-auto ${item.iconBg} ${item.iconColor} flex items-center justify-center text-2xl mb-5`}
                                whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.5 } }}
                            >
                                {item.icon}
                            </motion.div>

                            {/* Tag */}
                            <span className={`inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full mb-2 bg-gradient-to-r ${item.gradient} text-white`}>
                                {item.tag}
                            </span>

                            {/* Text */}
                            <h3 className="text-base font-bold text-slate-800 dark:text-white mt-1 mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                {item.desc}
                            </p>

                            {/* Arrow on hover */}
                            <motion.div
                                className={`mt-5 flex items-center gap-1.5 text-xs font-semibold ${item.iconColor}`}
                                initial={{ opacity: 0, x: -6 }}
                                whileHover={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                Learn more
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA strip */}
                <motion.div
                    className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Ready to start capturing your life lessons?
                    </p>
                    <Link href='/public-lesson'>
                        <button className="px-6 py-2.5 rounded-tl-2xl rounded-br-2xl bg-gradient-to-r from-purple-500 to-blue-600 text-white text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200">
                            Get Started Free
                        </button>
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}