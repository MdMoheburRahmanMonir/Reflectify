"use client";
import DeleteButtonLesson from "@/components/adminDashboard/LessonAction/DeleteButtonLesson";
import { FeaturedAndReviewSection } from "@/components/adminDashboard/LessonAction/FeaturedAndReviewSection";
import { LessonDetails } from "@/components/adminDashboard/LessonAction/LessonDetails";
import { userSessionClient } from "@/lib/actions/sessionClient";
import { AdminViewOrNot } from "@/lib/api/adminApi/LessonManaging/AdminViewOrNot";
import { StatusChangeAction } from "@/lib/api/adminApi/LessonManaging/StatusChangeAction";
import { Table } from "@heroui/react";
import { useMemo, useState } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";

const normalizePrivacy = (privacy) => {
    if (!privacy) return "public";
    const normalized = String(privacy).toLowerCase();
    if (normalized.includes("private")) return "private";
    if (normalized.includes("public")) return "public";
    return normalized;
};

const ManageLesson = ({ lessons }) => {
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortDescriptor, setSortDescriptor] = useState({ column: "title", direction: "ascending" });


    const session = userSessionClient();
    const filteredLessons = useMemo(() => {
        return lessons.filter((lesson) => {
            const normalizedStatus = String(lesson.status || "").toLowerCase();
            const matchesFilter =
                statusFilter === "all" ||
                statusFilter === normalizedStatus;

            const matchesSearch =
                lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lesson.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lesson.category.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesFilter && matchesSearch;
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
                        <h2 className="mt-4 text-3xl font-bold">{lessons.filter((item) => normalizePrivacy(item.privacy) === "privet").length}</h2>
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
                        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto] lg:w-[660px]">
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
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm("");
                                    setStatusFilter("all");
                                }}
                                className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-500 hover:bg-white hover:text-violet-600 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 overflow-x-auto">
                        <Table>
                            <Table.ScrollContainer>
                                <Table.Content
                                    aria-label="Lesson submissions"
                                    className="min-w-[1200px]"
                                    sortDescriptor={sortDescriptor}
                                    onSortChange={setSortDescriptor}
                                >
                                    <Table.Header>
                                        <Table.Column allowsSorting isRowHeader id="title" className="min-w-[280px]">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader className="text-sm" sortDirection={sortDirection}>
                                                    Title
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column allowsSorting id="userName" className="min-w-[180px]">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader className="text-sm" sortDirection={sortDirection}>
                                                    Publisher
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column allowsSorting id="category" className="min-w-[160px]">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader className="text-sm" sortDirection={sortDirection}>
                                                    Category
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column allowsSorting id="privacy" className="min-w-[140px]">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader className="text-sm" sortDirection={sortDirection}>
                                                    Privacy
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column allowsSorting id="accessLevel" className="min-w-[130px] text-center">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader className="text-sm" sortDirection={sortDirection}>
                                                    Access
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column allowsSorting id="status" className="min-w-[140px] text-center">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader className="text-sm" sortDirection={sortDirection}>
                                                    Status
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column allowsSorting id="createdTime" className="min-w-[150px] text-center">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader className="text-sm" sortDirection={sortDirection}>
                                                    Upload time
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column id="actions" className="min-w-[200px] text-right">
                                            Actions
                                        </Table.Column>
                                    </Table.Header>
                                    <Table.Body>
                                        {filteredLessons.length > 0 ? (
                                            filteredLessons.map((user, ind) => {
                                                const data = { ...session?.user, ...user };
                                                const viewHandling = async () => {
                                                    await AdminViewOrNot(data);
                                                };
                                                const statusHandling = async (value) => {
                                                    console.log(value);
                                                    const res = await StatusChangeAction(data, value);
                                                    console.log(res);
                                                };

                                                return (
                                                    <Table.Row key={ind} className="transition hover:bg-slate-50 dark:hover:bg-slate-900">
                                                        <Table.Cell onClick={viewHandling} className="min-w-[70px] max-w-[80px] whitespace-normal px-3 py-3">
                                                            <p className="font-semibold truncate line-clamp-1 text-sm leading-6 text-slate-700 dark:text-slate-300">{user.title}</p> 
                                                        </Table.Cell>
                                                        <Table.Cell onClick={viewHandling} className="min-w-[70px] max-w-[80px] whitespace-normal px-3 py-3 text-sm text-slate-700 dark:text-slate-300">
                                                            {user.userName}
                                                        </Table.Cell>
                                                        <Table.Cell onClick={viewHandling} className="min-w-[160px] px-3 py-3 text-sm">
                                                            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                                                                {user.category}
                                                            </span>
                                                        </Table.Cell>
                                                        <Table.Cell onClick={viewHandling} className="min-w-[140px] px-3 py-3 text-sm">
                                                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${user.plan === "premium" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200" : "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}>
                                                                {user.privacy}
                                                            </span>
                                                        </Table.Cell>
                                                        <Table.Cell onClick={viewHandling} className="min-w-[130px] px-3 py-3 text-center text-sm text-slate-700 dark:text-slate-200">
                                                            {user.accessLevel || 0}
                                                        </Table.Cell>
                                                        <Table.Cell className="min-w-[140px] px-3 py-3 text-center">
                                                            <select
                                                                name="plan"
                                                                defaultValue={`${user?.status || "pending"}`}
                                                                onChange={(e) => statusHandling(e.target.value)}
                                                                className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400"
                                                            >
                                                                <option value="pending">Pending</option>
                                                                <option value="approved">Approved</option>
                                                                <option value="rejected">Rejected</option>
                                                            </select>
                                                        </Table.Cell>
                                                        <Table.Cell onClick={viewHandling} className="min-w-[150px] whitespace-nowrap px-3 py-3 text-sm text-slate-600 dark:text-slate-400">
                                                            {user.createdTime || "—"}
                                                        </Table.Cell>
                                                        <Table.Cell className="min-w-[80px] pr-4 py-3">
                                                            <div className="flex items-center justify-end gap-1">
                                                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full ">
                                                                    <LessonDetails data={data} />
                                                                </span>
                                                                <span className="inline-flex pr-3 h-10 w-10 items-center justify-center rounded-full ">
                                                                    <DeleteButtonLesson data={data} />
                                                                </span>
                                                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full ">
                                                                    <FeaturedAndReviewSection data={data} />
                                                                </span>
                                                            </div>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                );
                                            })
                                        ) : (
                                            <Table.Row>
                                                <Table.Cell>
                                                    <div className="px-4 py-10 text-center text-xs text-slate-500 dark:text-slate-400">
                                                        No users found matching those filters.
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell />
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
