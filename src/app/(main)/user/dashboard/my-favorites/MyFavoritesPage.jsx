'use client';

import { useMemo, useState } from 'react';
import { Button, Chip, Table } from '@heroui/react';
import { FiSearch, FiFilter, FiTrash2 } from 'react-icons/fi';
import { RiResetLeftLine } from 'react-icons/ri'; 
import { LessonDetails } from '@/components/adminDashboard/LessonAction/LessonDetails';  
import { authClient } from '@/lib/auth-client';
import UnsavedButton from '@/components/userDashboard/MyFavoritePage/MyFavoriteDeleteButton';

const statusColorMap = {
    pending: 'warning',
    approved: 'success',
    rejected: 'danger',
};

export const MyFavoritesPage = ({ savedLessons = [] }) => {
    const { data: session } = authClient.useSession();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [emotionalToneFilter, setEmotionalToneFilter] = useState('all');

    // Extract unique categories and emotional tones
    const categories = useMemo(() => {
        const unique = new Set(savedLessons?.map((lesson) => lesson.category).filter(Boolean));
        return Array.from(unique);
    }, [savedLessons]);

    const emotionalTones = useMemo(() => {
        const unique = new Set(savedLessons?.map((lesson) => lesson.emotionalTone).filter(Boolean));
        return Array.from(unique);
    }, [savedLessons]);

    // Filter lessons
    const filteredLessons = useMemo(() => {
        const query = (searchTerm || '').toLowerCase();

        return (savedLessons || []).filter((lesson) => {
            const title = (lesson?.title || '').toLowerCase();
            const matchesSearch = title.includes(query);
            const matchesCategory = categoryFilter === 'all' || lesson.category === categoryFilter;
            const matchesTone = emotionalToneFilter === 'all' || lesson.emotionalTone === emotionalToneFilter;

            return matchesSearch && matchesCategory && matchesTone;
        });
    }, [savedLessons, searchTerm, categoryFilter, emotionalToneFilter]);

    const handleRemoveFavorite = async (lessonId) => {
        try {
            // TODO: Implement API call to remove from favorites
            console.log('Removing favorite:', lessonId);
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    return (
        <main className="min-h-screen text-slate-900 dark:text-white px-4 py-8">
            <div className="mx-auto max-w-7xl space-y-8">
                {/* Header Section */}
                <section className="rounded-[32px] border border-slate-200/70 bg-white/90 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
                            Dashboard / My Favorites
                        </p>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                            My Favorite Lessons
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                            Manage your saved lessons and favorite content in one place.
                        </p>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Total Saved</p>
                        <h2 className="mt-4 text-3xl font-bold">{savedLessons?.length || 0}</h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            Lessons you have saved.
                        </p>
                    </div>
                    <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Categories</p>
                        <h2 className="mt-4 text-3xl font-bold">{categories.length}</h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            Unique categories in your favorites.
                        </p>
                    </div>
                    <div className="rounded-[28px] border border-slate-200/70 bg-white/90 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/80">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">Results</p>
                        <h2 className="mt-4 text-3xl font-bold">{filteredLessons.length}</h2>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                            Matching current filters.
                        </p>
                    </div>
                </section>

                {/* Table Section */}
                <section className="rounded-[32px] border border-slate-200/70 bg-white/90 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/80">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-[20px] font-bold text-slate-900 dark:text-white">Your Favorites</h2>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                View and manage all your saved lessons with filtering options.
                            </p>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto_auto] lg:w-[800px]">
                            <label className="relative block">
                                <span className="sr-only">Search lessons</span>
                                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <FiSearch className="h-4 w-4" />
                                </span>
                                <input
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Search by title"
                                    className="w-full rounded-3xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400"
                                />
                            </label>

                            <div className="relative">
                                <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <select
                                    value={categoryFilter}
                                    onChange={(event) => setCategoryFilter(event.target.value)}
                                    className="w-full rounded-3xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400"
                                >
                                    <option value="all">All categories</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative">
                                <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <select
                                    value={emotionalToneFilter}
                                    onChange={(event) => setEmotionalToneFilter(event.target.value)}
                                    className="w-full rounded-3xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-white/10 dark:bg-slate-900 dark:text-white dark:focus:border-violet-400"
                                >
                                    <option value="all">All tones</option>
                                    {emotionalTones.map((tone) => (
                                        <option key={tone} value={tone}>
                                            {tone}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm('');
                                    setCategoryFilter('all');
                                    setEmotionalToneFilter('all');
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
                                <Table.Content aria-label="Saved lessons" className="min-w-[1000px]">
                                    <Table.Header>
                                        <Table.Column isRowHeader id="title" className="min-w-[240px]">
                                            Lesson Title
                                        </Table.Column>
                                        <Table.Column id="category" className="min-w-[140px]">
                                            Category
                                        </Table.Column>
                                        <Table.Column id="emotionalTone" className="min-w-[140px]">
                                            Emotional Tone
                                        </Table.Column>
                                        <Table.Column id="accessLevel" className="min-w-[120px]">
                                            Access
                                        </Table.Column>
                                        <Table.Column id="description" className="min-w-[200px]">
                                            Description
                                        </Table.Column>
                                        <Table.Column id="actions" className="min-w-[300px]">
                                            Actions
                                        </Table.Column>
                                    </Table.Header>
                                    <Table.Body>
                                        {filteredLessons.length > 0 ? (
                                            filteredLessons.map((lesson) => (
                                                <Table.Row
                                                    key={lesson._id || lesson.id}
                                                    className="transition hover:bg-slate-50 dark:hover:bg-slate-900"
                                                >
                                                    <Table.Cell className="font-medium text-slate-700 dark:text-slate-200 truncate">
                                                        {lesson.title || 'Untitled'}
                                                    </Table.Cell>
                                                    <Table.Cell className="text-slate-600 dark:text-slate-300">
                                                        <Chip size="sm" variant="flat" className="text-xs">
                                                            {lesson.category || 'N/A'}
                                                        </Chip>
                                                    </Table.Cell>
                                                    <Table.Cell className="text-slate-600 dark:text-slate-300">
                                                        <Chip size="sm" variant="flat" className="text-xs">
                                                            {lesson.emotionalTone || 'N/A'}
                                                        </Chip>
                                                    </Table.Cell>
                                                    <Table.Cell className="text-sm text-slate-600 dark:text-slate-300">
                                                        {lesson.accessLevel || 'Public'}
                                                    </Table.Cell>
                                                    <Table.Cell className="text-sm text-slate-600 dark:text-slate-300 truncate">
                                                        {lesson.description ? lesson.description.substring(0, 50) + '...' : 'N/A'}
                                                    </Table.Cell>
                                                    <Table.Cell className={`w-full`}>
                                                        <div className="flex items-center w-full gap-3">
                                                            <span className="w-7 h-7 rounded-full flex justify-center items-center">
                                                                <LessonDetails data={lesson} />
                                                            </span>
                                                            <span className="w-7 h-7 rounded-full flex justify-center items-center">
                                                                <UnsavedButton lesson={lesson} session={session} />
                                                            </span>
                                                        </div>
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))
                                        ) : (
                                            <Table.Row>
                                                <Table.Cell colSpan={6}>
                                                    <div className="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                                                        No saved lessons match your current filters.
                                                    </div>
                                                </Table.Cell>
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
