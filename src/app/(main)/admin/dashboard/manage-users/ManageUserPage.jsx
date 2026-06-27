"use client";

import { Table } from "@heroui/react";
import { useMemo, useState } from "react";
import { FiSearch, FiFilter, FiShield } from "react-icons/fi";
import Link from "next/link";
import DeleteButton from "@/components/adminDashboard/UserAction/DeleteButton";
import RoleUpdateByAdmin from "@/components/adminDashboard/UserAction/RoleUpdateByAdmin";
import PlanUpdateByAdmin from "@/components/adminDashboard/UserAction/PlanUpdateByAdmin";

const ManageUserPage = ({ users, token }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [sortDescriptor, setSortDescriptor] = useState({ column: "name", direction: "ascending" });

    const filteredUsers = useMemo(() => {
        return users
            .filter((user) => {
                const matchesSearch =
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase());

                const matchesRole =
                    roleFilter === "all" || user.role === roleFilter;

                return matchesSearch && matchesRole;
            })
            .sort((a, b) => {
                const first = String(a[sortDescriptor.column]);
                const second = String(b[sortDescriptor.column]);
                const comparison = first.localeCompare(second);
                return sortDescriptor.direction === "descending" ? -comparison : comparison;
            });
    }, [searchTerm, roleFilter, sortDescriptor]);

    return (
        // ১. এখানে w-full এবং overflow-x-hidden নিশ্চিত করা হয়েছে যাতে কোনো কন্টেন্ট স্ক্রিন ঠেলে ডানে সরাতে না পারে
        <main className="w-full min-h-screen px-4 py-6 sm:py-8 overflow-x-hidden">
            <div className="mx-auto w-full max-w-7xl space-y-6 sm:space-y-8">
                
                {/* Header Card */}
                <section className="rounded-2xl sm:rounded-[32px] border border-slate-200/70 bg-white/90 p-5 sm:p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
                                Admin / Manage users
                            </p>
                            {/* bg-linear-to-r এর বদলে স্ট্যান্ডার্ড Tailwind v3 এর bg-gradient-to-r ব্যবহার করা হয়েছে */}
                            <h1 className="mt-3 sm:mt-4 text-2xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                                User management dashboard
                            </h1>
                            <p className="mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm leading-6 sm:leading-7 text-slate-600 dark:text-slate-400">
                                Review accounts, promote contributors, and remove inactive or abusive users quickly.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Counter Cards Grid */}
                <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    {/* Total Users */}
                    <div className="rounded-2xl sm:rounded-[28px] border border-slate-200/70 bg-white/90 p-5 sm:p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-xs sm:text-sm uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Total users</p>
                        <h2 className="mt-2 sm:mt-4 text-2xl sm:text-3xl font-bold">{users?.length}</h2>
                        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                            Registered users on the platform.
                        </p>
                    </div>
                    
                    {/* Admins */}
                    <div className="rounded-2xl sm:rounded-[28px] border border-slate-200/70 bg-white/90 p-5 sm:p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-xs sm:text-sm uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Admins</p>
                        <h2 className="mt-2 sm:mt-4 text-2xl sm:text-3xl font-bold">{users?.filter((user) => user.role === "admin").length}</h2>
                        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                            Users with admin privileges.
                        </p>
                    </div>
                    
                    {/* Premium Users */}
                    <div className="rounded-2xl sm:rounded-[28px] border border-slate-200/70 bg-white/90 p-5 sm:p-6 shadow-sm sm:col-span-2 md:col-span-1 dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-xs sm:text-sm uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Premium users</p>
                        <h2 className="mt-2 sm:mt-4 text-2xl sm:text-3xl font-bold">{users?.filter((user) => user.plan === "user_pro").length}</h2>
                        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                            Users with premium membership.
                        </p>
                    </div>
                </section>

                {/* Main Filter and Table/Card View Section */}
                <section className="rounded-2xl sm:rounded-[32px] border border-slate-200/70 bg-white/90 p-4 sm:p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold">User accounts</h2>
                            <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                                Search, filter, and act on any user account in the system.
                            </p>
                        </div>
                        {/* সার্চ এবং ফিল্টার ইনপুট মোবাইল রেসপনসিভ করার ফিক্স */}
                        <div className="grid gap-3 w-full sm:grid-cols-[1fr_auto] lg:w-[520px]">
                            <div className="relative w-full">
                                <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="search"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Search name or email"
                                    className="w-full rounded-3xl border border-slate-200 bg-white py-2.5 sm:py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-violet-400"
                                />
                            </div>
                            <div className="relative w-full">
                                <FiFilter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <select
                                    value={roleFilter}
                                    onChange={(event) => setRoleFilter(event.target.value)}
                                    className="w-full rounded-3xl border border-slate-200 bg-white py-2.5 sm:py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400"
                                >
                                    <option value="all">All roles</option>
                                    <option value="user">Users</option>
                                    <option value="admin">Admins</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Desktop/Tablet Table View */}
                    <div className="mt-6 sm:mt-8">
                        <div className="hidden md:block w-full overflow-x-auto">
                            <Table>
                                <Table.ScrollContainer>
                                    <Table.Content
                                        aria-label="User accounts"
                                        className="min-w-[950px]"
                                        sortDescriptor={sortDescriptor}
                                        onSortChange={setSortDescriptor}
                                    >
                                        <Table.Header className="bg-slate-50 dark:bg-slate-900/80">
                                            <Table.Column allowsSorting isRowHeader id="name">
                                                {({ sortDirection }) => (
                                                    <Table.SortableColumnHeader className="text-sm" sortDirection={sortDirection}>
                                                        Name
                                                    </Table.SortableColumnHeader>
                                                )}
                                            </Table.Column>
                                            <Table.Column allowsSorting id="email">
                                                {({ sortDirection }) => (
                                                    <Table.SortableColumnHeader className="text-sm" sortDirection={sortDirection}>
                                                        Email
                                                    </Table.SortableColumnHeader>
                                                )}
                                            </Table.Column>
                                            <Table.Column allowsSorting id="role">
                                                {({ sortDirection }) => (
                                                    <Table.SortableColumnHeader className="text-sm" sortDirection={sortDirection}>
                                                        Role
                                                    </Table.SortableColumnHeader>
                                                )}
                                            </Table.Column>
                                            <Table.Column allowsSorting id="plan">
                                                {({ sortDirection }) => (
                                                    <Table.SortableColumnHeader className="text-sm" sortDirection={sortDirection}>
                                                        Plan
                                                    </Table.SortableColumnHeader>
                                                )}
                                            </Table.Column>
                                            <Table.Column allowsSorting id="lessons">
                                                {({ sortDirection }) => (
                                                    <Table.SortableColumnHeader className="text-sm" sortDirection={sortDirection}>
                                                        Lessons
                                                    </Table.SortableColumnHeader>
                                                )}
                                            </Table.Column>
                                            <Table.Column className="text-sm" id="actions">Actions</Table.Column>
                                        </Table.Header>
                                        <Table.Body>
                                            {filteredUsers.length > 0 ? (
                                                filteredUsers.map((user, ind) => (
                                                    <Table.Row key={ind} className="even:bg-slate-50 dark:even:bg-slate-900/80">
                                                        <Table.Cell className="max-w-[220px]">
                                                            <p className="font-semibold">{user.name}</p>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400">{user.id}</p>
                                                        </Table.Cell>
                                                        <Table.Cell className="max-w-[220px] overflow-hidden text-ellipsis whitespace-nowrap">{user.email}</Table.Cell>
                                                        <Table.Cell>
                                                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${user.role === "admin" ? "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200" : "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}>
                                                                {user.role}
                                                            </span>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${user.plan === "premium" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200" : "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}>
                                                                {user.plan}
                                                            </span>
                                                        </Table.Cell>
                                                        <Table.Cell>{user.lessons || 0}</Table.Cell>
                                                        <Table.Cell>
                                                            <div className="flex flex-wrap items-center justify-center gap-2">
                                                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full transition">
                                                                    <PlanUpdateByAdmin clientId={user._id} token={token}/>
                                                                </span>
                                                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full transition">
                                                                    <RoleUpdateByAdmin clientId={user._id} token={token}/>
                                                                </span>
                                                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full transition">
                                                                    <DeleteButton clientId={user._id} token={token}/>
                                                                </span>
                                                            </div>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                ))
                                            ) : (
                                                <Table.Row>
                                                    <Table.Cell colSpan={6}>
                                                        <div className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                                                            No users found matching those filters.
                                                        </div>
                                                    </Table.Cell>
                                                </Table.Row>
                                            )}
                                        </Table.Body>
                                    </Table.Content>
                                </Table.ScrollContainer>
                            </Table>
                        </div>

                        {/* Mobile List View */}
                        <div className="flex flex-col gap-4 md:hidden">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user, ind) => (
                                    <div key={ind} className="rounded-2xl sm:rounded-3xl border border-slate-200/70 bg-slate-50 p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex flex-col gap-1">
                                                <p className="text-base sm:text-lg font-semibold text-slate-950 dark:text-white">{user.name}</p>
                                                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 break-all">{user.email}</p>
                                            </div>
                                            <div className="flex flex-wrap gap-2 text-[10px] sm:text-xs font-semibold uppercase">
                                                <span className={`rounded-full px-2.5 py-1 ${user.role === "admin" ? "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200" : "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}>
                                                    {user.role}
                                                </span>
                                                <span className={`rounded-full px-2.5 py-1 ${user.plan === "premium" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200" : "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}>
                                                    {user.plan}
                                                </span>
                                                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                                    Lessons: {user.lessons || 0}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-200 dark:border-slate-800">
                                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-white shadow-sm transition dark:bg-slate-950 dark:text-white">
                                                    <PlanUpdateByAdmin clientId={user._id} token={token}/>
                                                </span>
                                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-white shadow-sm transition dark:bg-slate-950 dark:text-white">
                                                    <RoleUpdateByAdmin clientId={user._id} token={token}/>
                                                </span>
                                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-white shadow-sm transition dark:bg-slate-950 dark:text-white">
                                                    <DeleteButton clientId={user._id} token={token}/>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-2xl border border-slate-200/70 bg-slate-50 p-6 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-400">
                                    No users found matching those filters.
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ManageUserPage;