"use client";
import { Pagination } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters
    const [query, setQuery] = useState("");
    const [department, setDepartment] = useState("");
    const [status, setStatus] = useState("");
    const [isRemote, setIsRemote] = useState(null);

    Pagination 
    const [page, setPage] = useState(1);
    const totalItems = jobs.length;
    const itemsPerPage = 12;
    const totalPages = totalItems / itemsPerPage;

    console.log(totalPages);

    const startItem = 1;
    const endItem = 4;
    const getPageNumbers = () => {
        const page = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        return page;
    }
  






    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('http://localhost:5000/api/jobs');
                const data = await res.json();
                setJobs(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error(error);
                setJobs([]);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const departments = useMemo(() => {
        const set = new Set(jobs.map((j) => j.department).filter(Boolean));
        return ["", ...Array.from(set)];
    }, [jobs]);

    const statuses = useMemo(() => {
        const set = new Set(jobs.map((j) => j.status).filter(Boolean));
        return ["", ...Array.from(set)];
    }, [jobs]);

    const filtered = useMemo(() => {
        return jobs.filter((j) => {
            if (query) {
                const q = query.toLowerCase();
                const inText = [j.title, j.company, j.location, j.department]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase()
                    .includes(q);
                const inSkills = (j.skills || []).some((s) => s.toLowerCase().includes(q));
                if (!inText && !inSkills) return false;
            }
            if (department && j.department !== department) return false;
            if (status && j.status !== status) return false;
            if (isRemote !== null && j.isRemote !== isRemote) return false;
            return true;
        });
    }, [jobs, query, department, status, isRemote]);
    // Pagination area
    


    return (
        <main className="min-h-screen py-10 px-4 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-semibold mb-6">Jobs</h1>

                {/* Search controls: improved UI */}
                <div className="mb-8 grid gap-4 sm:grid-cols-4 items-center">
                    <div className="relative col-span-1 sm:col-span-1">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
                            <circle cx="11" cy="11" r="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <input
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by title, company or skill"
                            className="w-full rounded-3xl border border-slate-200 bg-white px-12 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-200 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                        />
                    </div>

                    <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                    >
                        {departments.map((d) => (
                            <option key={d || "all"} value={d}>
                                {d || "All Departments"}
                            </option>
                        ))}
                    </select>

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100"
                    >
                        {statuses.map((s) => (
                            <option key={s || "all"} value={s}>
                                {s || "All Statuses"}
                            </option>
                        ))}
                    </select>

                    <div className="flex items-center gap-3 justify-end">
                        <div
                            onClick={() => setIsRemote((v) => (v === true ? null : true))}
                            className={`flex items-center gap-3 cursor-pointer rounded-full px-3 py-2 ${isRemote === true ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-950'}`}
                        >
                            <div className={`h-5 w-5 rounded-full bg-white ${isRemote === true ? 'translate-x-0.5' : ''}`} />
                            <span className="text-sm">Remote</span>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                setQuery("");
                                setDepartment("");
                                setStatus("");
                                setIsRemote(null);
                            }}
                            className="ml-2 rounded-3xl px-4 py-2 bg-slate-100 text-sm dark:bg-slate-800"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Jobs grid */}
                {loading ? (
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">Loading...</div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((job) => (
                            <article key={job._id || `${job.title}-${job.company}`} className="rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 truncate">{job.title}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{job.company} • {job.location}</p>
                                    </div>
                                    <div className="text-right text-sm">
                                        <p className="font-semibold text-slate-900 dark:text-slate-100">{job.salary ? `$${job.salary.toLocaleString()}` : "-"}</p>
                                        <p className="text-slate-500 dark:text-slate-400">{job.experience} yrs</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-sm text-slate-600 dark:text-slate-300">Department: <span className="font-medium text-slate-800 dark:text-slate-100">{job.department}</span></p>
                                    <div className="flex items-center gap-2">
                                        {job.isRemote && <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">Remote</span>}
                                        <span className={`px-2 py-1 rounded-full text-xs ${job.status === 'active' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200'}`}>
                                            {job.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {(job.skills || []).map((s) => (
                                        <span key={s} className="rounded-full bg-slate-100 px-3 py-1 text-xs dark:bg-slate-700 dark:text-slate-100">
                                            {s}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <div className="text-sm text-slate-500 dark:text-slate-400">Applicants: <span className="font-medium text-slate-700 dark:text-slate-100">{job.applicants}</span></div>
                                    <div className="flex items-center gap-3">
                                        <time className="text-xs text-slate-400 dark:text-slate-500">{new Date(job.posted).toLocaleDateString()}</time>
                                        <button className="rounded-2xl bg-blue-600 px-4 py-2 text-sm text-white">View</button>
                                    </div>
                                </div>
                            </article>
                        ))}
                        {filtered.length === 0 && (
                            <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-8 text-center dark:bg-slate-800">No jobs found</div>
                        )}
                    </div>
                )}
                <div className="mt-8 flex flex-col items-center gap-3">
                    <Pagination>
                        <Pagination.Summary>
                            Showing {startItem}–{endItem} of {filtered.length} results
                        </Pagination.Summary>
                        <Pagination.Content>
                            <Pagination.Item>
                                <Pagination.Previous
                                    isDisabled={page === 1}
                                    onPress={() => setPage((p) => p - 1)}
                                >
                                    <Pagination.PreviousIcon />
                                    <span>Previous</span>
                                </Pagination.Previous>
                            </Pagination.Item>

                            {getPageNumbers().map((p, i) =>
                                p === "ellipsis" ? (
                                    <Pagination.Item key={`ellipsis-${i}`}>
                                        <Pagination.Ellipsis />
                                    </Pagination.Item>
                                ) : (
                                    <Pagination.Item key={p}>
                                        <Pagination.Link
                                            isActive={p === page}
                                            onPress={() => setPage(p)}
                                        >
                                            {p}
                                        </Pagination.Link>
                                    </Pagination.Item>
                                )
                            )}

                            <Pagination.Item>
                                <Pagination.Next
                                    isDisabled={page === totalPages}
                                    onPress={() => setPage((p) => p + 1)}
                                >
                                    <span>Next</span>
                                    <Pagination.NextIcon />
                                </Pagination.Next>
                            </Pagination.Item>
                        </Pagination.Content>
                    </Pagination>
                </div>
            </div>
        </main>
    );
}
