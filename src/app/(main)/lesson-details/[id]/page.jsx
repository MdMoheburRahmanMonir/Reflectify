'use server';

import LikeButton from '@/components/LikeButton';
import { ReportButton } from '@/components/ReportButton';
import SavedButton from '@/components/SavedButton';
import { userSessionServer } from '@/lib/actions/session';
import { LessonDetails } from '@/lib/api/Lesson_Details_page/Lesson_Details_page';
import { PostACommentToServer } from '@/lib/api/PostACommentToServer';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { FaTelegram } from 'react-icons/fa';


const LessonDetailsPage = async ({ params }) => {
    const { token } = await auth.api.getToken({ headers: await headers() });

    const { id } = await params;
    const session = await userSessionServer();
    const value = await LessonDetails(id, session, token);
    const lessonData = value.lessonData;
    const sampleComments = value.commentData;

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



    const handleComment = async (formData) => {
        'use server';
        const comment = formData.get('comment');
        const data = {
            comment,
            commenterName: session?.user?.name,
            commenterId: session?.user?.id,
            commenterImage: session?.user?.image,
            lessonId: lessonData._id,
            commentTime: new Date(),
        }
        try {
            const commentPost = await PostACommentToServer(data, token)
            console.log(commentPost);
            if (commentPost.acknowledged) {
                redirect(`/lesson-details/${id}`)
            }

        } catch (error) {
            console.log("Something Want Wrong!");
        }

    }



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
                        <Link href={`/public-profile/${lessonData.userId}`}>
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
                        </Link>
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
                <div className="mt-8 rounded-[26px] border border-slate-200/80  p-4 shadow-[0_18px_50px_-22px_rgba(15,23,42,0.35)] backdrop-blur-sm dark:border-slate-700/80  sm:p-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">Comments</h2>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Share your thoughts and join the conversation.</p>
                        </div>
                        <span className="inline-flex w-fit rounded-full bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1 text-sm font-medium text-purple-700 dark:from-purple-900/50 dark:to-blue-900/50 dark:text-purple-200">
                            {sampleComments.length} comments
                        </span>
                    </div>

                    <form action={handleComment} className="mt-5 rounded-[20px] border   bg-slate-50/90 p-3 shadow-inner   dark:bg-slate-900/70 sm:p-4">
                        <div className="flex items-center gap-3">
                            <div
                                style={{ backgroundImage: `url(${session?.user?.image})` }}
                                className="flex h-10 w-10 bg-cover bg-center shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-xs font-bold text-white shadow-md">

                            </div>
                            <input
                                id="comment"
                                name="comment"
                                type="text"
                                placeholder="What's on your mind?"
                                className="flex-1 rounded-full border border-slate-200   px-4 py-2.5 text-sm text-slate-700 placeholder-slate-500 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:border-slate-600 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:ring-purple-900"
                            />
                            <button
                                type="submit"
                                className="shrink-0 rounded-full p-2 text-slate-600 transition hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700"
                                title="Camera"
                            >
                                <FaTelegram className='size-7 text-black dark:text-white ' />
                            </button>
                        </div>
                    </form>

                    <div className="mt-5 space-y-3">
                        {sampleComments.map((comment) => (
                            <div key={comment._id} className="rounded-[18px] p-3.5 transition shadow shadow-black/20 dark:shadow-white/20 border-purple-200 hover:shadow-sm   sm:p-4">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <div
                                            style={{ backgroundImage: `url(${comment.commenterImage})` }}
                                            className="flex h-9 bg-cover bg-center w-9 overflow-hidden items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-500 text-sm font-semibold text-white dark:from-purple-600 dark:to-blue-600">

                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-900 dark:text-white">{comment.commenterName}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{comment.commentTime ? new Date(comment.commentTime).toLocaleString() : null}</p>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main >
    );
};

export default LessonDetailsPage;