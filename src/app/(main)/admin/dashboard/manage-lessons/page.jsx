"use client";

import { Table } from "@heroui/react";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
    FiFilter,
    FiSearch,
    FiStar,
    FiTrash2,
    FiEye,
    FiShield,
    FiCheckCircle,
} from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";

const lessons = [
    {
        id: "L-1024",
        title: "How to rebuild confidence after failure",
        creator: "Amina Rahman",
        category: "Mindset",
        access: "Premium",
        visibility: "Public",
        featured: true,
        flagged: 2,
        createdAt: "Jun 18, 2026",
    },
    {
        id: "L-1019",
        title: "Turning painful moments into growth",
        creator: "Rafi Ahmed",
        category: "Personal Growth",
        access: "Free",
        visibility: "Public",
        featured: false,
        flagged: 0,
        createdAt: "Jun 20, 2026",
    },
    {
        id: "L-1007",
        title: "The quiet strength of consistency",
        creator: "Sabila Noor",
        category: "Career",
        access: "Premium",
        visibility: "Private",
        featured: false,
        flagged: 1,
        createdAt: "Jun 14, 2026",
    },
    {
        id: "L-0986",
        title: "Why gratitude changes your story",
        creator: "Fahim Khan",
        category: "Relationships",
        access: "Free",
        visibility: "Public",
        featured: true,
        flagged: 0,
        createdAt: "Jun 11, 2026",
    },
];

const ManageLessonPage = () => {
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortDescriptor, setSortDescriptor] = useState({ column: "title", direction: "ascending" });

    const filteredLessons = useMemo(() => {
        return lessons
            .filter((lesson) => {
                const matchesFilter =
                    statusFilter === "all" ||
                    (statusFilter === "featured" && lesson.featured) ||
                    (statusFilter === "flagged" && lesson.flagged > 0) ||
                    (statusFilter === "private" && lesson.visibility === "Private");

                const matchesSearch =
                    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    lesson.creator.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    lesson.category.toLowerCase().includes(searchTerm.toLowerCase());

                return matchesFilter && matchesSearch;
            })
            .sort((a, b) => {
                const first = String(a[sortDescriptor.column]);
                const second = String(b[sortDescriptor.column]);
                const comparison = first.localeCompare(second);
                return sortDescriptor.direction === "descending" ? -comparison : comparison;
            });
    }, [statusFilter, searchTerm, sortDescriptor]);

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white px-4 py-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <section className="rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
                                Admin / Manage lessons
                            </p>
                            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                                Lesson moderation panel
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                                Review all lessons, mark featured content, resolve flagged items, and keep the public library safe.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Link
                                href="/admin/dashboard/reported-lessons"
                                className="inline-flex items-center justify-center gap-2 rounded-3xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-600"
                            >
                                <FiShield className="h-5 w-5" />
                                Go to reported lessons
                            </Link>
                            <Link
                                href="/admin/dashboard/manage-users"
                                className="inline-flex items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-violet-500 hover:bg-violet-50 dark:border-white/10 dark:bg-slate-900 dark:text-white"
                            >
                                <FaFacebook className="h-5 w-5" />
                                Manage users
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 lg:grid-cols-3">
                    <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Total lessons</p>
                        <h2 className="mt-4 text-3xl font-bold">{lessons.length}</h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            All lessons created by every user on the platform.
                        </p>
                    </div>
                    <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Featured lessons</p>
                        <h2 className="mt-4 text-3xl font-bold">{lessons.filter((item) => item.featured).length}</h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            Lessons highlighted on the home page for maximum visibility.
                        </p>
                    </div>
                    <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Flagged content</p>
                        <h2 className="mt-4 text-3xl font-bold">{lessons.filter((item) => item.flagged > 0).length}</h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            Lessons requiring admin attention due to user reports.
                        </p>
                    </div>
                </section>

                <section className="rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Lessons list</h2>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Filter, search, and take action on lesson submissions.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-[1fr_auto] lg:w-[520px]">
                            <label className="relative block">
                                <span className="sr-only">Search lessons</span>
                                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <FiSearch className="h-4 w-4" />
                                </span>
                                <input
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Search by title, author, or category"
                                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400"
                                />
                            </label>
                            <div className="relative">
                                <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <select
                                    value={statusFilter}
                                    onChange={(event) => setStatusFilter(event.target.value)}
                                    className="w-full rounded-3xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400"
                                >
                                    <option value="all">All lessons</option>
                                    <option value="featured">Featured</option>
                                    <option value="flagged">Flagged</option>
                                    <option value="private">Private</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 overflow-x-auto">
                        <Table>
                            <Table.ScrollContainer>
                                <Table.Content
                                    aria-label="Lesson moderation table"
                                    className="min-w-[1000px]"
                                    sortDescriptor={sortDescriptor}
                                    onSortChange={setSortDescriptor}
                                >
                                    <Table.Header>
                                        <Table.Column allowsSorting isRowHeader id="title">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader sortDirection={sortDirection}>
                                                    Lesson
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column allowsSorting id="creator">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader sortDirection={sortDirection}>
                                                    Creator
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column allowsSorting id="category">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader sortDirection={sortDirection}>
                                                    Category
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column allowsSorting id="access">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader sortDirection={sortDirection}>
                                                    Access
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column allowsSorting id="status">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader sortDirection={sortDirection}>
                                                    Status
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column id="actions">Actions</Table.Column>
                                    </Table.Header>
                                    <Table.Body>
                                        {filteredLessons.length > 0 ? (
                                            filteredLessons.map((lesson) => (
                                                <Table.Row key={lesson.id}>
                                                    <Table.Cell>
                                                        <div className="max-w-xs">
                                                            <p className="font-semibold text-slate-900 dark:text-white">{lesson.title}</p>
                                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{lesson.createdAt}</p>
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <p className="font-medium text-slate-900 dark:text-white">{lesson.creator}</p>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                                                            {lesson.category}
                                                        </span>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${lesson.access === "Premium" ? "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200" : "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}>
                                                            {lesson.access}
                                                        </span>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            {lesson.featured && (
                                                                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700 dark:bg-amber-500/15 dark:text-amber-200">
                                                                    Featured
                                                                </span>
                                                            )}
                                                            {lesson.flagged > 0 && (
                                                                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-red-700 dark:bg-red-500/15 dark:text-red-200">
                                                                    Flagged
                                                                </span>
                                                            )}
                                                            {lesson.visibility === "Private" && (
                                                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                                                                    Private
                                                                </span>
                                                            )}
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <div className="flex items-center justify-center gap-2">
                                                            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-white transition hover:bg-slate-700">
                                                                <FiEye className="h-5 w-5" />
                                                            </button>
                                                            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-violet-500 text-white transition hover:bg-violet-600">
                                                                <FiStar className="h-5 w-5" />
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
                                                        No lessons matched your filter. Try a different search or status.
                                                    </div>
                                                </Table.Cell>
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

export default ManageLessonPage;
