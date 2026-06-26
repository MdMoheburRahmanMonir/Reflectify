'use client'
import { AdminViewOrNot } from "@/lib/api/adminApi/LessonManaging/AdminViewOrNot"; 
import { Button, Modal, Surface } from "@heroui/react";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";

export function LessonDetails({ data, token }) {

    const { title, _id, description, category, emotionalTone, accessLevel, privacy, lessonPhoto, status, userName, userEmail, userImage, userId, createdTime, productId } = data;
    const viewHandling = async () => {
        await AdminViewOrNot(data, token)
    }

    return (
        <Modal className={`w-full`}>
            <Button onClick={viewHandling} variant="secondary" className={`p-0 m-0 h-2 w-2 relative group`}>
                <FaRegEye className="size-4" />
            </Button>

            <Modal.Backdrop className={`w-full`}>
                <Modal.Container placement="auto w-full" >
                    <Modal.Dialog className="sm:max-w-md lg:max-w-3xl ">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="bg-gradient-to-l from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">User Published Lesson</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6 w-full">
                            <Surface variant="default">
                                <div className="max-w-3xl mx-auto">
                                    <div className="overflow-hidden rounded-3xl border border-white/30 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl shadow-xl">

                                        {/* Cover Image */}
                                        <div className="relative h-72 w-full">
                                            <img
                                                src={lessonPhoto}
                                                alt={title}
                                                className="w-full h-full object-cover"
                                            />

                                            {/* Status */}
                                            <span className="absolute top-4 right-4 px-4 py-1 rounded-full text-xs font-semibold bg-amber-500 text-white shadow-lg">
                                                {status == 'pending' ? 'Status Pending' : "Status Approved"}
                                            </span>

                                            {/* Access Level */}
                                            <span className="absolute top-4 left-4 px-4 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                                {accessLevel.toUpperCase()}
                                            </span>

                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                            <div className="absolute bottom-6 left-6 right-6">
                                                <h2 className="text-3xl font-bold text-white">
                                                    {title}
                                                </h2>

                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur text-white">
                                                        {category}
                                                    </span>

                                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur text-white">
                                                        {emotionalTone}
                                                    </span>

                                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur text-white">
                                                        {privacy}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 md:p-8">

                                            {/* Author */}
                                            <div className="flex items-center gap-4 pb-6 border-b border-slate-200 dark:border-slate-700">
                                                <img
                                                    src={userImage}
                                                    alt={userName}
                                                    className="w-14 h-14 rounded-full border-2 border-indigo-500"
                                                />

                                                <div>
                                                    <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                                                        {userName}
                                                    </h3>

                                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                                        {userEmail}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <div className="mt-6">
                                                <h4 className="font-semibold text-lg text-slate-800 dark:text-white mb-3">
                                                    Life Lesson
                                                </h4>

                                                <p className="leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">
                                                    {description}
                                                </p>
                                            </div>

                                            {/* Footer */}
                                            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">

                                                <div className="flex gap-3 flex-wrap">
                                                    <span className="px-4 py-2 rounded-xl bg-indigo-50 dark:bg-slate-800 text-sm font-medium">
                                                        📚 {category}
                                                    </span>

                                                    <span className="px-4 py-2 rounded-xl bg-purple-50 dark:bg-slate-800 text-sm font-medium">
                                                        ✨ {emotionalTone}
                                                    </span>
                                                    <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium">
                                                        <Link href={`/lesson-details/${_id}`}>
                                                            View Details
                                                        </Link>
                                                    </span>
                                                </div>

                                                <div className="text-sm text-slate-500 dark:text-slate-400">
                                                    {createdTime}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Surface>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button slot="close" variant="secondary">
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}