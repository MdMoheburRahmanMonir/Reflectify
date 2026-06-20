"use client";
import { Pagination } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const [query, setQuery] = useState("");
    const [department, setDepartment] = useState("");
    const [status, setStatus] = useState("");
    const [isRemote, setIsRemote] = useState(null);

    const [page, setPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("http://localhost:5000/api/jobs");
                const data = await res.json();
                setJobs(Array.isArray(data) ? data : [data]);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const filtered = useMemo(() => {
        return jobs.filter((j) => {
            const q = query.toLowerCase();

            if (query) {
                const inText = [j.title, j.company, j.location, j.department]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase()
                    .includes(q);

                const inSkills = (j.skills || []).some((s) =>
                    s.toLowerCase().includes(q)
                );

                if (!inText && !inSkills) return false;
            }

            if (department && j.department !== department) return false;
            if (status && j.status !== status) return false;
            if (isRemote !== null && j.isRemote !== isRemote) return false;

            return true;
        });
    }, [jobs, query, department, status, isRemote]);

    const paginatedJobs = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return filtered.slice(start, start + itemsPerPage);
    }, [filtered, page]);

    const totalPages = Math.ceil(filtered.length / itemsPerPage);

    return (
        <main className="min-h-screen px-4 py-12 bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100">

            <div className="mx-auto max-w-7xl">

                {/* HEADER */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-transparent bg-clip-text">
                        Explore Jobs
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        Find your next opportunity with smart filtering
                    </p>
                </div>

                {/* FILTER BAR (Gorgeous Glass UI) */}
                <div className="mb-10 rounded-3xl border border-white/20 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl shadow-lg p-5 grid gap-4 sm:grid-cols-4">

                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search jobs..."
                        className="w-full rounded-2xl px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-400 outline-none"
                    />

                    <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="rounded-2xl px-4 py-3 bg-white dark:bg-slate-800 border"
                    >
                        <option value="">All Departments</option>
                        <option>Engineering</option>
                        <option>Marketing</option>
                        <option>Design</option>
                    </select>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="rounded-2xl px-4 py-3 bg-white dark:bg-slate-800 border"
                    >
                        <option value="">All Status</option>
                        <option>active</option>
                        <option>closed</option>
                    </select>

                    <button
                        onClick={() => {
                            setQuery("");
                            setDepartment("");
                            setStatus("");
                            setIsRemote(null);
                            setPage(1);
                        }}
                        className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-[1.02] transition"
                    >
                        Reset Filters
                    </button>
                </div>

                {/* JOB GRID */}
                {loading ? (
                    <div className="text-center py-20 text-slate-500">
                        Loading amazing opportunities...
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                        {paginatedJobs.map((job) => (
                            <article
                                key={job._id}
                                className="group rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 shadow-md hover:shadow-2xl transition transform hover:-translate-y-1"
                            >

                                {/* TITLE */}
                                <h3 className="text-lg font-bold group-hover:text-indigo-500 transition">
                                    {job.title}
                                </h3>

                                <p className="text-sm text-slate-500 mt-1">
                                    {job.company} • {job.location}
                                </p>

                                {/* META */}
                                <div className="mt-4 flex justify-between text-sm">
                                    <span className="font-semibold text-indigo-500">
                                        {job.salary ? `$${job.salary}` : "N/A"}
                                    </span>
                                    <span className="text-slate-500">{job.experience} yrs</span>
                                </div>

                                {/* TAGS */}
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {(job.skills || []).slice(0, 3).map((s) => (
                                        <span
                                            key={s}
                                            className="px-3 py-1 text-xs rounded-full bg-indigo-50 dark:bg-slate-700 text-indigo-600 dark:text-slate-200"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>

                                {/* FOOTER */}
                                <div className="mt-6 flex justify-between items-center">
                                    <span className="text-xs text-slate-400">
                                        {new Date(job.posted).toLocaleDateString()}
                                    </span>

                                    <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm hover:scale-105 transition">
                                        View
                                    </button>
                                </div>
                            </article>
                        ))}

                        {paginatedJobs.length === 0 && (
                            <div className="col-span-full text-center py-10 text-slate-500">
                                No jobs found 😢
                            </div>
                        )}
                    </div>
                )}

                {/* PAGINATION (CLEAN PREMIUM STYLE) */}
                <div className="mt-12 flex justify-center">
                    <div className="flex items-center gap-2 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl px-4 py-3 rounded-2xl border">

                        <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="px-3 py-1 rounded-lg disabled:opacity-40"
                        >
                            Prev
                        </button>

                        <span className="text-sm font-semibold">
                            {page} / {totalPages || 1}
                        </span>

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => p + 1)}
                            className="px-3 py-1 rounded-lg disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>

            </div>
        </main>
    );
}