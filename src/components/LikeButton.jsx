'use client'
import { PublicLikeButton } from '@/lib/api/PulicLikeButton';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { RiHeart3Fill, RiHeart3Line } from 'react-icons/ri';
import { toast } from 'react-toastify';

const LikeButton = ({ lesson, session }) => {
    const filter = lesson?.likes?.includes(session?.user?.id);
    const [likedLessons, setLikedLessons] = useState(filter || false);
    const [isSaving, setIsSaving] = useState(false);


    const totalLikes = 1200 + (lesson?.likeCount || 0);
    const likeLabel = `${totalLikes} ${totalLikes === 1 ? 'like' : 'likes'}`;

    const data = {
        likerId: session?.user?.id,
        lessonId: lesson?._id,
        isLike: !likedLessons
    };

    const handelLike = async () => {
        if (!session?.user) {
            toast.error("You have to login First!")
            redirect("/login")
        }
        if (!lesson?._id || !session?.user?.id) return;
        setLikedLessons(prev => !prev);
        setIsSaving(true);
        try {
            await PublicLikeButton(data);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handelLike}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-2 py-1 text-xs font-medium text-neutral-700 shadow-sm transition hover:border-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
            {likedLessons ? (
                <RiHeart3Fill className="h-5 w-5 text-red-500" />
            ) : (
                <RiHeart3Line className="h-5 w-5 text-neutral-500" />
            )}
            <span>{likeLabel}</span>
        </button>
    );
};

export default LikeButton;