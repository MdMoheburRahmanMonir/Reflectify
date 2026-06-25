'use client'
import { PublicSavedButton } from '@/lib/api/PublicSavedButton';
import { redirect } from 'next/navigation';
import React, { useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { toast } from 'react-toastify';

const SavedButton = ({ lesson, session }) => {
    const filter = lesson?.savedLesson?.includes(session?.user?.id);
    const [savedLesson, setSavedLesson] = useState(filter || false);
    const [isSaving, setIsSaving] = useState(false);

    const savedCount = 342 + (lesson?.savedCount || 0);
    const saveLabel = `${savedCount} ${savedCount === 1 ? 'save' : 'saves'}`;
 
    const data = {
        saverId: session?.user?.id,
        lessonId: lesson?._id,
        isSaved: !savedLesson
    };

    const handleSaved = async () => {
        if (!session?.user) {
            toast.error("You have to login First!")
            redirect("/login")
        }
        if (!lesson?._id || !session?.user?.id) return;
        setSavedLesson(prev => !prev);
        setIsSaving(true);
        try {
            await PublicSavedButton(data);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <button
            type="button"
            onClick={handleSaved}
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-2 py-1 text-xs font-medium text-neutral-700 shadow-sm transition hover:border-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
            {savedLesson ? (
                <FaBookmark className="h-5 w-5 text-purple-500" />
            ) : (
                <FaRegBookmark className="h-5 w-5 text-neutral-500" />
            )}
            <span>{saveLabel}</span>
        </button>
    );
};

export default SavedButton;