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

export const MyFavoritesPage = ({ savedLessons = [], token }) => {
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
            // console.log('Removing favorite:', lessonId);
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
                            <h2 className="text-[20px] font-bold ">Your Favorites</h2>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                View and manage all your saved lessons with filtering options.
                            </p>
                        </div>
                        <div className="grid gap-3 grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] lg:w-[800px]">
                            <label className="relative block">
                                <span className="sr-only hidden">Search lessons</span>
                                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                                    <FiSearch className="h-4 w-4" />
                                </span>
                                <input
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Search by title"
                                    className="shadow-lg  dark:shadow-white/15 shadow-black/15 w-full pl-10 rounded-full  px-4 py-2 bg-white dark:bg-slate-900"
                                />
                            </label>

                            <div className="relative">
                                <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <select
                                    value={categoryFilter}
                                    onChange={(event) => setCategoryFilter(event.target.value)}
                                    className="shadow-lg dark:shadow-white/15 shadow-black/15 w-full pl-10 rounded-full  px-4 py-2 bg-white dark:bg-slate-900"
                                >
                                    <option value="all" className='text-slate-900 dark:text-white'>All categories</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat} className='text-slate-900 dark:text-white'>
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
                                    className="shadow-lg  dark:shadow-white/15 shadow-black/15 w-full pl-10 rounded-full  px-4 py-2 bg-white dark:bg-slate-900"
                                >
                                    <option value="all" className='text-black dark:text-white'>All tones</option>
                                    {emotionalTones.map((tone) => (
                                        <option key={tone} value={tone} className='text-black dark:text-white'>
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
                                className="inline-flex  items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold transition hover:border-violet-500 hover:bg-white hover:text-violet-600 dark:border-white/50 shadow-lg dark:shadow-white/15 shadow-black/15 w-full  dark:bg-slate-900 "
                            >
                                <RiResetLeftLine />
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 overflow-x-auto">
                        <div className="hidden md:block">
                            <Table>
                                <Table.ScrollContainer>
                                    <Table.Content aria-label="Saved lessons" className="min-w-[850px]">
                                        <Table.Header>
                                            <Table.Column isRowHeader id="title" className="min-w-[200px]">
                                                Lesson Title
                                            </Table.Column>
                                            <Table.Column id="category" className="min-w-[120px]">
                                                Category
                                            </Table.Column>
                                            <Table.Column id="emotionalTone" className="min-w-[120px]">
                                                Emotional Tone
                                            </Table.Column>
                                            <Table.Column id="accessLevel" className="min-w-[100px]">
                                                Access
                                            </Table.Column>
                                            <Table.Column id="description" className="min-w-[160px]">
                                                Description
                                            </Table.Column>
                                            <Table.Column id="actions" className="min-w-[180px]">
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
                                                                    <LessonDetails data={lesson} token={token} />
                                                                </span>
                                                                <span className="w-7 h-7 rounded-full flex justify-center items-center">
                                                                    <UnsavedButton lesson={lesson} session={session} token={token} />
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
                        <div className="md:hidden grid gap-4">
                            {filteredLessons.length > 0 ? (
                                filteredLessons.map((lesson) => (
                                    <div key={lesson._id || lesson.id} className="rounded-3xl border border-slate-200/70 bg-slate-50 p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/80">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <h3 className="text-base font-semibold text-slate-900 dark:text-white truncate">{lesson.title || 'Untitled'}</h3>
                                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 truncate">{lesson.category || 'Category'}</p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400">{lesson.emotionalTone || 'Tone'}</p>
                                            </div>
                                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                                {lesson.accessLevel || 'Public'}
                                            </span>
                                        </div>
                                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
                                            {lesson.description ? lesson.description.substring(0, 80) + '...' : 'No description available.'}
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-3">
                                            <LessonDetails data={lesson} token={token} />
                                            <UnsavedButton lesson={lesson} session={session} token={token} />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-3xl border border-slate-200/70 bg-slate-50 p-6 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-slate-900/80 dark:text-slate-400">
                                    No saved lessons match your current filters.
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};
