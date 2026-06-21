"use client"; 
import { Table } from "@heroui/react";
import { useMemo, useState } from "react"; 
import {
    FiFilter,
    FiSearch,
    FiStar,
    FiTrash2,
    FiEye,
    FiShield,
} from "react-icons/fi";

const lessons = [
    {
        _id: "6a36d6eb4e3ae94ac9c328df",
        productId: "6a36d6eb4e3ae94ac9c328df",
        title: "Share a Life Lesson",
        description: "Write something meaningful that can inspire others",
        category: "career",
        emotionalTone: "realization",
        accessLevel: "free",
        privacy: "privet",
        lessonPhoto: "https://i.ibb.co/rDm9Npv/486617745-122109492590801894-816294486645845418-n.jpg",
        status: "pending",
        userName: "manik mia",
        userEmail: "mahgsgjsxx@gmail.com",
        userImage: "https://lh3.googleusercontent.com/a/ACg8ocITtKsfzuWCSmwyeHFxrCgjg19N9QxyjHFyOi-23MjxzFpIz9g=s96-c",
        userId: "6a33bf0e88a3e921c081babe",
        createdTime: "2026-06-20T18:07:38.971Z",
    },
];

const normalizePrivacy = (privacy) => {
    if (!privacy) return "Unknown";
    const normalized = privacy.toLowerCase();
    if (normalized.includes("priv")) return "Private";
    return "Public";
};

const capitalize = (value) => {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
};

const ManageLesson = () => {
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortDescriptor, setSortDescriptor] = useState({ column: "title", direction: "ascending" });

    const filteredLessons = useMemo(() => {
        return lessons
            .filter((lesson) => {
                const matchesFilter =
                    statusFilter === "all" ||
                    (statusFilter === "pending" && lesson.status === "pending") ||
                    (statusFilter === "private" && normalizePrivacy(lesson.privacy) === "Private");

                const matchesSearch =
                    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    lesson.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    lesson.category.toLowerCase().includes(searchTerm.toLowerCase());

                return matchesFilter && matchesSearch;
            })
            .sort((a, b) => {
                const first = String(a[sortDescriptor.column] || "");
                const second = String(b[sortDescriptor.column] || "");
                const comparison = first.localeCompare(second);
                return sortDescriptor.direction === "descending" ? -comparison : comparison;
            });
    }, [statusFilter, searchTerm, sortDescriptor]);

    return (
        <main className="min-h-screen text-slate-900 dark:text-white px-4 py-8">
            <div className="mx-auto max-w-7xl space-y-8"> 
                <section className="grid gap-4 lg:grid-cols-3">
                    <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Total lessons</p>
                        <h2 className="mt-4 text-3xl font-bold">{lessons.length}</h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            All lessons created by every user on the platform.
                        </p>
                    </div>
                    <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Pending lessons</p>
                        <h2 className="mt-4 text-3xl font-bold">{lessons.filter((item) => item.status === "pending").length}</h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            Submissions waiting for admin review.
                        </p>
                    </div>
                    <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Private lessons</p>
                        <h2 className="mt-4 text-3xl font-bold">{lessons.filter((item) => normalizePrivacy(item.privacy) === "Private").length}</h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            Lessons restricted from public view.
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
                                    className="w-full rounded-3xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400"
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
                                    <option value="pending">Pending</option>
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
                                        <Table.Column allowsSorting id="userName">
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
                                        <Table.Column allowsSorting id="accessLevel">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader sortDirection={sortDirection}>
                                                    Access
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column allowsSorting id="privacy">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader sortDirection={sortDirection}>
                                                    Privacy
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
                                                <Table.Row key={lesson.productId}>
                                                    <Table.Cell>
                                                        <div className="max-w-xs">
                                                            <p className="font-semibold text-slate-900 dark:text-white">{lesson.title}</p>
                                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                                                {new Date(lesson.createdTime).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                                            </p>
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <p className="font-medium text-slate-900 dark:text-white">{lesson.userName}</p>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                                                            {lesson.category}
                                                        </span>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${lesson.accessLevel === "premium" ? "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200" : "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}>
                                                            {capitalize(lesson.accessLevel)}
                                                        </span>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${normalizePrivacy(lesson.privacy) === "Private" ? "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200"}`}>
                                                            {normalizePrivacy(lesson.privacy)}
                                                        </span>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${lesson.status === "pending" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200"}`}>
                                                            {capitalize(lesson.status)}
                                                        </span>
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

export default ManageLesson;
