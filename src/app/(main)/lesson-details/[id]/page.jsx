import LikeButton from '@/components/LikeButton';
import { ReportButton } from '@/components/ReportButton';
import SavedButton from '@/components/SavedButton';
import { userSessionServer } from '@/lib/actions/session';
import { LessonDetails } from '@/lib/api/Lesson_Details_page/Lesson_Details_page';
import { redirect } from 'next/navigation';
import React from 'react'; 


const LessonDetailsPage = async ({ params }) => {
    const { id } = await params;
    const session = await userSessionServer(); 
    const lessonData = await LessonDetails(id, session);
    console.log(lessonData, "Lesson data fetched from API");
    if (!session?.user) {
        redirect('/login');
    }
    if (lessonData?.accessLevel === 'premium') {
        if (session?.user?.plan === 'free') {
            redirect('/plans');
        }
    } 

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
        <main className="bg-slate-50 dark:bg-slate-900 flex items-center py-12">
            <div className="mx-auto w-full max-w-7xl px-4 ">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden ">
                    <div
                        className="relative w-full h-96 md:h-[560px] bg-center bg-cover "
                        style={{ backgroundImage: `url(${lessonData.lessonPhoto || '/placeholder.jpg'})` }}
                    >
                        <div className="absolute inset-0 bg-black/50" />

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

                            <h1 className="mt-4 text-2xl md:text-6xl sm:text-2xl font-black text-white drop-shadow-xl leading-tight">{lessonData.title}</h1>
                            <p className="mt-4 max-w-2xl text-base text-white/90">{lessonData.description}</p>
                        </div>

                        {/* Action buttons bottom-right */}
                        <div className="absolute bottom-6 left-6 z-20 flex flex-wrap gap-3">
                            <LikeButton lesson={lessonData} session={session} />
                            <SavedButton lesson={lessonData} session={session} />
                            <ReportButton lesson={lessonData} />
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
};

export default LessonDetailsPage;