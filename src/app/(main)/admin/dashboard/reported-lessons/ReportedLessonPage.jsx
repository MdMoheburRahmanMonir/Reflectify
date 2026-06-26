"use client";

import { Table } from "@heroui/react";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
    FiSearch,
    FiFilter,
    FiShield,
} from "react-icons/fi";
import { RiResetLeftLine } from "react-icons/ri";
import { ReportTable } from "@/components/adminDashboard/ReportActon/ReportTable";
import { DeleteReportAction } from "@/components/adminDashboard/ReportActon/DeleteReportAction";
import { IgnoreReport } from "@/components/adminDashboard/ReportActon/IgnoreReport";


export const ReportedLessonPage = ({ reportedLessons, session, token }) => {
  

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [countFilter, setCountFilter] = useState("all");
    const [sortDescriptor, setSortDescriptor] = useState({ column: "lessonTitle", direction: "ascending" });

    const filteredReports = useMemo(() => {
        const s = (searchTerm || '').toLowerCase();
        return (reportedLessons || [])
            .filter((item) => {
                const title = (item?.lessonTitle || '').toLowerCase();
                const count = Number(item?.count ?? 0);
                const status = (item?.status || '').toLowerCase();

                const matchesSearch = title.includes(s);
                const matchesCount =
                    countFilter === 'all' ||
                    (countFilter === '3+' ? count >= 3 : count === Number(countFilter));
                const matchesStatus = statusFilter === 'all' || status === statusFilter;

                return matchesSearch && matchesCount && matchesStatus;
            })
            .sort((a, b) => {
                const first = String(a?.[sortDescriptor.column] ?? '');
                const second = String(b?.[sortDescriptor.column] ?? '');
                const comparison = first.localeCompare(second, undefined, { numeric: true });
                return sortDescriptor.direction === 'descending' ? -comparison : comparison;
            });
    }, [reportedLessons, searchTerm, statusFilter, countFilter, sortDescriptor]);

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
                    </div>
                </section>

                <section className=" ">
                    <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Total reports</p>
                        <h2 className="mt-4 text-3xl font-bold">{reportedLessons.reduce((sum, item) => sum + item.count, 0)}</h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            Reported lessons awaiting admin attention.
                        </p>
                    </div>
                </section>

                <section className="rounded-[32px] border border-slate-200/70 bg-white/90 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-[20px] font-bold text-slate-900 dark:text-white">Reported lessons table</h2>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Filter by status, search reports, and inspect each issue before resolving.
                            </p>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto_auto] lg:w-[700px]">
                            <label className="relative block">
                                <span className="sr-only">Search lessons</span>
                                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <FiSearch className="h-4 w-4" />
                                </span>
                                <input
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Search by lesson title"
                                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400"
                                />
                            </label>

                            <div className="relative">
                                <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <select
                                    value={countFilter}
                                    onChange={(event) => setCountFilter(event.target.value)}
                                    className="w-full rounded-3xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400"
                                >
                                    <option value="all">All counts</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3+">3+</option>
                                </select>
                            </div>


                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm("");
                                    setStatusFilter("all");
                                    setCountFilter("all");
                                }}
                                className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-violet-500 hover:bg-white hover:text-violet-600 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                            >
                                <RiResetLeftLine />
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 overflow-x-auto">
                        <Table>
                            <Table.ScrollContainer>
                                <Table.Content aria-label="Reported lessons" className="min-w-[900px]">
                                    <Table.Header>
                                        <Table.Column isRowHeader id="title" className="min-w-[220px]">Lesson Title</Table.Column>
                                        <Table.Column isRowHeader id="count" className="min-w-[220px]">Lesson Count</Table.Column>
                                        <Table.Column isRowHeader id="details" className="min-w-[220px]">Details</Table.Column>
                                        <Table.Column isRowHeader id="action" className="min-w-[220px]">Action</Table.Column>
                                    </Table.Header>
                                    <Table.Body>
                                        {filteredReports.length > 0 ? (
                                            filteredReports.map((item, ind) => (
                                                <Table.Row key={ind} className="transition hover:bg-slate-50 dark:hover:bg-slate-900">
                                                    <Table.Cell className="whitespace-normal px-3 py-3">
                                                        <p className="font-mono text-xs text-slate-700 dark:text-slate-300">{item.lessonTitle}</p>
                                                    </Table.Cell>
                                                    <Table.Cell className="px-3 py-3 text-sm text-slate-700 dark:text-slate-200">{item.count}</Table.Cell>
                                                    <Table.Cell className="px-3 py-3 text-sm text-slate-700 dark:text-slate-200">
                                                        <ReportTable lessonId={item.lessonId} session={session} token={token} />
                                                    </Table.Cell>
                                                    <Table.Cell className="px-3 py-3 gap-3 flex text-sm text-slate-600 dark:text-slate-400">
                                                        <DeleteReportAction lessonId={item.lessonId} session={session} token={token} />
                                                        <IgnoreReport lessonId={item.lessonId} session={session} token={token} />
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))
                                        ) : (
                                            <Table.Row>
                                                <Table.Cell>
                                                    <div className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">No reported lessons match the current filter.</div>
                                                </Table.Cell>
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
