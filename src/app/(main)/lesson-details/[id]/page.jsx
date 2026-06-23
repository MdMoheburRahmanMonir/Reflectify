import { userSessionServer } from '@/lib/actions/session';
import { LessonDetails } from '@/lib/api/Lesson_Details_page/Lesson_Details_page';
import { redirect } from 'next/navigation'; 
import React  from 'react';
import { FaBookmark  } from 'react-icons/fa';
 
import { FeaturedAndReviewSection } from '@/components/adminDashboard/LessonAction/FeaturedAndReviewSection';

const LessonDetailsPage = async ({ params }) => {
    const { id } = await params;
    const session = await userSessionServer();
    if (!session?.user) {
        redirect('/login');
    }

    const lessonData = await LessonDetails(id, session);

    if (!lessonData) {
        return (
            <main className="min-h-screen flex items-center justify-center px-4 py-20">
                <div className="max-w-2xl text-center">
                    <h2 className="text-2xl font-semibold">Lesson not found</h2>
                    <p className="mt-2 text-sm text-slate-600">The lesson you're looking for could not be loaded.</p>
                </div>
            </main>
        );
    }

    const created = lessonData.createdTime ? new Date(lessonData.createdTime).toLocaleString() : null;

    return (
        <main className="min-h-screen  bg-slate-50 dark:bg-slate-900 flex items-center py-12">
            <div className="mx-auto w-full max-w-7xl px-4 ">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden ">
                    <div
                        className="relative w-full h-96 md:h-[560px] bg-center bg-cover "
                        style={{ backgroundImage: `url(${lessonData.lessonPhoto || '/placeholder.jpg'})` }}
                    >
                        <div className="absolute inset-0 bg-black/40" />

                        {/* Profile + meta card in top-left */}
                        <div className="absolute hidden md:block lg:block bottom-4 right-4 z-20">
                            <div className=" bg-slate-900/10 backdrop-blur-2xl shadow-xl rounded-2xl p-4 max-w-sm">
                                <div className="flex items-center gap-3">
                                    <img src={lessonData.userImage || '/avatar-placeholder.png'} alt={lessonData.userName} className="h-14 w-14 rounded-full object-cover" />
                                    <div>
                                        <p className="font-semibold text-white">{lessonData.userName}</p>
                                        <p className="text-xs text-white">{lessonData.userEmail}</p>
                                    </div>
                                </div>

                                <div className="mt-4 text-sm text-slate-700 dark:text-slate-300 space-y-2">
                                    <p className='text-white'><span className="font-semibold text-white">Access:</span> {lessonData.accessLevel}</p>
                                    <p className='text-white'><span className="font-semibold text-white">Privacy:</span> {lessonData.privacy}</p>
                                    {created && <p className='text-white'><span className="font-semibold text-white">Uploaded:</span> {created}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Title and description on left-middle */}
                        <div className="absolute left-6 top-6 transform   z-20 max-w-3xl">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-purple-600 to-blue-600  text-sm font-semibold text-white">{lessonData.category || 'General'}</span>
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700/70 text-sm text-white">{lessonData.emotionalTone}</span>
                            </div>

                            <h1 className="mt-4 text-5xl md:text-6xl font-black text-white drop-shadow-xl leading-tight">{lessonData.title}</h1>
                            <p className="mt-4 max-w-2xl text-base text-white/90">{lessonData.description}</p>
                        </div>

                        {/* Action buttons bottom-right */}
                        <div className="absolute bottom-6 left-6 z-20 flex flex-wrap gap-3">
                            <button className="flex backdrop-blur-[7px] items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                                </svg>
                                Report
                            </button>
                            <button className="flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-violet-700 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.41 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                                Like
                            </button>
                            <button className="flex items-center gap-2 rounded-full bg-linear-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-violet-700 transition">
                                <FaBookmark />
                                Save
                            </button>
 
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
};

export default LessonDetailsPage;