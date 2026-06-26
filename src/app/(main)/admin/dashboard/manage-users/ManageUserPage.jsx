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
        <main className="min-h-screen text-slate-900 dark:text-white px-4 py-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <section className="rounded-[32px] border border-slate-200/70 bg-white/90 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
                                Admin / Manage users
                            </p>
                            <h1 className="mt-4 text-4xl font-bold tracking-tight bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                                User management dashboard
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                                Review accounts, promote contributors, and remove inactive or abusive users quickly.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-sm uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Total users</p>
                        <h2 className="mt-4 text-3xl font-bold">{users?.length}</h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            Registered users on the platform.
                        </p>
                    </div>
                    <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-sm uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Admins</p>
                        <h2 className="mt-4 text-3xl font-bold">{users?.filter((user) => user.role === "admin").length}</h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            Users with admin privileges.
                        </p>
                    </div>
                    <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-sm uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Premium users</p>
                        <h2 className="mt-4 text-3xl font-bold">{users?.filter((user) => user.plan === "user_pro").length}</h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            Users with premium membership.
                        </p>
                    </div>
                </section>

                <section className="rounded-[32px] border border-slate-200/70 bg-white/90 p-6 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">User accounts</h2>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Search, filter, and act on any user account in the system.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-[1fr_auto] lg:w-[520px]">

                            <div className="relative">
                                <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <select
                                    value={roleFilter}
                                    onChange={(event) => setRoleFilter(event.target.value)}
                                    className="w-full rounded-3xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400"
                                >
                                    <option value="all">All roles</option>
                                    <option value="user">Users</option>
                                    <option value="admin">Admins</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 overflow-x-auto">
                        <Table>
                            <Table.ScrollContainer>
                                <Table.Content
                                    aria-label="User accounts"
                                    className="min-w-[1000px]"
                                    sortDescriptor={sortDescriptor}
                                    onSortChange={setSortDescriptor}
                                >
                                    <Table.Header>
                                        <Table.Column allowsSorting isRowHeader id="name">
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader className="text-sm " sortDirection={sortDirection}>
                                                    Name
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column allowsSorting id="email" >
                                            {({ sortDirection }) => (
                                                <Table.SortableColumnHeader className="text-sm max-w-14" sortDirection={sortDirection}>
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
                                                <Table.SortableColumnHeader className="text-sm max-w-5" sortDirection={sortDirection}>
                                                    Lessons
                                                </Table.SortableColumnHeader>
                                            )}
                                        </Table.Column>
                                        <Table.Column className="text-sm" id="actions">Actions</Table.Column>
                                    </Table.Header>
                                    <Table.Body>
                                        {filteredUsers.length > 0 ? (
                                            filteredUsers.map((user, ind) => (
                                                <Table.Row key={ind}>
                                                    <Table.Cell className={`overflow-hidden w-32`}>
                                                        <p className="font-semibold ">{user.name}</p>
                                                        <p className="text-xs text-slate-500 dark:text-slate-400">{user.id}</p>
                                                    </Table.Cell>
                                                    <Table.Cell className={`overflow-hidden max-w-16 min-w-10`} >{user.email}</Table.Cell>
                                                    <Table.Cell className={`overflow-hidden w-32`}>
                                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${user.role === "admin" ? "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-200" : "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}>
                                                            {user.role}
                                                        </span>
                                                    </Table.Cell>
                                                    <Table.Cell className={`overflow-hidden w-32`}>
                                                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${user.plan === "premium" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200" : "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300"}`}>
                                                            {user.plan}
                                                        </span>
                                                    </Table.Cell>
                                                    <Table.Cell className={`overflow-hidden w-32`}>{user.lessons || 0}</Table.Cell>
                                                    <Table.Cell className={`overflow-hidden w-32`}>
                                                        <div className="flex items-center justify-center  ">
                                                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full   transition  ">
                                                                <PlanUpdateByAdmin clientId={user._id} token={token}/>
                                                            </span>
                                                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full   transition  ">
                                                                <RoleUpdateByAdmin clientId={user._id} token={token}/>
                                                            </span>
                                                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full   transition  ">
                                                                <DeleteButton clientId={user._id} token={token}/>
                                                            </span>
                                                        </div>
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))
                                        ) : (
                                            <Table.Row>
                                                <Table.Cell>
                                                    <div className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                                                        No users found matching those filters.
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

export default ManageUserPage;
