"use client";

import { Table } from "@heroui/react";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
    FiSearch,
    FiFilter,
    FiTrash2,
    FiCheckCircle,
    FiShield,
} from "react-icons/fi";

const reportedLessons = [
    {
        id: "R-2041",
        title: "When hard work finally makes sense",
        lessonOwner: "Amina Rahman",
        reporter: "Rafi Ahmed",
        reason: "Inappropriate language",
        reportCount: 3,
        status: "Pending",
        reportedAt: "Jun 21, 2026",
    },
    {
        id: "R-2035",
        title: "Lessons from a failed startup",
        lessonOwner: "Sabila Noor",
        reporter: "Fahim Khan",
        reason: "Misleading claim",
        reportCount: 1,
        status: "In review",
        reportedAt: "Jun 19, 2026",
    },
    {
        id: "R-2028",
        title: "How to forgive yourself after mistake",
        lessonOwner: "Nusrat Jahan",
        reporter: "Amin Chowdhury",
        reason: "Sensitive content",
        reportCount: 5,
        status: "Resolved",
        reportedAt: "Jun 15, 2026",
    },
];

const ReportedLessonPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortDescriptor, setSortDescriptor] = useState({ column: "title", direction: "ascending" });

    const filteredReports = useMemo(() => {
        return reportedLessons
            .filter((item) => {
                const matchesSearch =
                    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.lessonOwner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.reporter.toLowerCase().includes(searchTerm.toLowerCase());

                const matchesStatus =
                    statusFilter === "all" || item.status.toLowerCase() === statusFilter;

                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                const first = String(a[sortDescriptor.column]);
                const second = String(b[sortDescriptor.column]);
                const comparison = first.localeCompare(second);
                return sortDescriptor.direction === "descending" ? -comparison : comparison;
            });
    }, [searchTerm, statusFilter, sortDescriptor]);

    return (
        <main className="min-h-screen text-slate-900 dark:text-white px-4 py-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <section className="rounded-[32px] border border-slate-200/70 bg-white/90 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
                                Admin / Reported lessons
                            </p>
                            <h1 className="mt-4 text-4xl font-bold tracking-tight bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                                Reported lessons review
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                                Resolve flagged lessons, inspect reports, and take action to keep the community safe.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2 lg:justify-end">
                            <Link
                                href="/admin/dashboard/manage-lessons"
                                className="inline-flex items-center justify-center gap-2 rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
                            >
                                <FiShield className="h-5 w-5" />
                                Manage lessons
                            </Link>
                            <Link
                                href="/admin/dashboard/manage-users"
                                className="inline-flex items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-violet-500 hover:bg-violet-50 shadow-lg shadow-black/10 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:shadow-white/10"
                            >
                                <FiShield className="h-5 w-5" />
                                Manage users
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Total reports</p>
                        <h2 className="mt-4 text-3xl font-bold">{reportedLessons.length}</h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            Reported lessons awaiting admin attention.
                        </p>
                    </div>
                    <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Pending review</p>
                        <h2 className="mt-4 text-3xl font-bold">{reportedLessons.filter((item) => item.status === "Pending").length}</h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            Reports that need immediate action.
                        </p>
                    </div>
                    <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Resolved reports</p>
                        <h2 className="mt-4 text-3xl font-bold">{reportedLessons.filter((item) => item.status === "Resolved").length}</h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            Reports that have already been handled.
                        </p>
                    </div>
                </section>

                <section className="rounded-[32px] border border-slate-200/70 bg-white/90 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Reported lessons table</h2>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Filter by status, search reports, and inspect each issue before resolving.
                            </p>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto] lg:w-[680px]">
                            <label className="relative block">
                                <span className="sr-only">Search reports</span>
                                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <FiSearch className="h-4 w-4" />
                                </span>
                                <input
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Search by lesson, owner, or reporter"
                                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400"
                                />
                            </label>
                            <div className="relative">
                                <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <select
                                    value={statusFilter}
                                    onChange={(event) => setStatusFilter(event.target.value)}
                                    className="w-full rounded-3xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400"
                                >
                                    <option value="all">All statuses</option>
                                    <option value="pending">Pending</option>
                                    <option value="in review">In review</option>
                                    <option value="resolved">Resolved</option>
                                </select>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm("");
                                    setStatusFilter("all");
                                }}
                                className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-violet-500 hover:bg-white hover:text-violet-600 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 overflow-x-auto">
                        <Table>
                            <Table.ScrollContainer>
                                <Table.Content
                                    aria-label="Reported lessons"
                                    className="min-w-[1200px]"
                                    sortDescriptor={sortDescriptor}
                                    onSortChange={setSortDescriptor}
                                >
                                    <Table.Header>
                                        <Table.Column allowsSorting isRowHeader id="title" className="min-w-[280px]">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader sortDirection={sortDirection}>
                                                    Lesson title
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column allowsSorting id="lessonOwner" className="min-w-[180px]">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader sortDirection={sortDirection}>
                                                    Owner
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column allowsSorting id="reporter" className="min-w-[180px]">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader sortDirection={sortDirection}>
                                                    Reporter
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column id="reason" className="min-w-[220px]">
                                            Reason
                                        </Table.Column>
                                        <Table.Column allowsSorting id="reportCount" className="w-28 text-center">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader sortDirection={sortDirection}>
                                                    Reports
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column allowsSorting id="status" className="w-28 text-center">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader sortDirection={sortDirection}>
                                                    Status
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column id="actions" className="min-w-[170px] text-right">
                                            Actions
                                        </Table.Column>
                                    </Table.Header>
                                    <Table.Body>
                                        {filteredReports.length > 0 ? (
                                            filteredReports.map((item) => (
                                                <Table.Row key={item.id} className="transition hover:bg-slate-50 dark:hover:bg-slate-900">
                                                    <Table.Cell className="whitespace-normal px-3 py-3">
                                                        <p className="font-semibold text-sm text-slate-900 dark:text-white">{item.title}</p>
                                                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.reportedAt}</p>
                                                    </Table.Cell>
                                                    <Table.Cell className="px-3 py-3 text-sm text-slate-700 dark:text-slate-200">{item.lessonOwner}</Table.Cell>
                                                    <Table.Cell className="px-3 py-3 text-sm text-slate-700 dark:text-slate-200">{item.reporter}</Table.Cell>
                                                    <Table.Cell className="px-3 py-3 text-sm text-slate-600 dark:text-slate-400">{item.reason}</Table.Cell>
                                                    <Table.Cell className="px-3 py-3 text-center text-sm font-semibold text-slate-900 dark:text-white">{item.reportCount}</Table.Cell>
                                                    <Table.Cell className="px-3 py-3 text-center">
                                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${item.status === "Resolved" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200" : item.status === "In review" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200" : "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-200"}`}>
                                                            {item.status}
                                                        </span>
                                                    </Table.Cell>
                                                    <Table.Cell className="px-3 py-3">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white transition hover:bg-emerald-600">
                                                                <FiCheckCircle className="h-5 w-5" />
                                                            </button>
                                                            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white transition hover:bg-red-600">
                                                                <FiTrash2 className="h-5 w-5" />
                                                            </button>
                                                        </div>
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))
                                        ) : (
                                            <Table.Row>
                                                <Table.Cell>
                                                    <div className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                                                        No reported lessons match the current filter.
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell />
                                                <Table.Cell />
                                                <Table.Cell />
                                                <Table.Cell />
                                                <Table.Cell />
                                                <Table.Cell />
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                </Table.Content>
                            </Table.ScrollContainer>
                        </Table>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ReportedLessonPage;
