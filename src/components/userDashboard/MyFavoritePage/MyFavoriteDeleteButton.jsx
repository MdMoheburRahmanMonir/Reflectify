'use client'
import { PublicSavedButton } from '@/lib/api/PublicSavedButton';
import React, { useState } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

const UnsavedButton = ({ lesson, session }) => {
    const filter = lesson?.savedLesson?.includes(session?.user?.id);
    const [savedLesson, setSavedLesson] = useState(filter || false);
    const [isSaving, setIsSaving] = useState(false);

    const savedCount = 1200 + lesson?.savedCount;
    const saveLabel = `${savedCount} ${savedCount === 1 ? 'save' : 'saves'}`;
 
    const data = {
        saverId: session?.user?.id,
        lessonId: lesson?._id,
        isSaved: !savedLesson
    };

    const handleSaved = async () => {
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
            className="inline-flex items-center gap-2 rounded-full border   px-2 py-1 text-xs font-medium text-neutral-700 shadow-sm transition hover:border-red-500  "
        >
            {savedLesson ? (
                <FaBookmark className="h-5 w-5 text-purple-500" />
            ) : (
                <FaRegBookmark className="h-5 w-5 text-neutral-500" />
            )} 
        </button>
    );
};

export default UnsavedButton;