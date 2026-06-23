"use client";

import { AdminViewOrNot } from "@/lib/api/adminApi/LessonManaging/AdminViewOrNot";
import { StatusUpdatePublicOrPrivate } from "@/lib/api/adminApi/LessonManaging/StatusUpdatePublicOrPrivate";
import { useState } from "react";
import { FaLock, FaRegStar, FaStar } from "react-icons/fa";
import { LuEarth } from "react-icons/lu";
export function FeaturedAndReviewSection({ data }) {
    const [isView, setIsView] = useState(data.isViewAdmin || false);
    const [isPublic, setIsPublic] = useState(data.anyoneCanSee);
    data.anyoneCanSee = !isPublic;


    const viewHandling = async () => {
        await AdminViewOrNot(data)
    } 
    return (
        <div className="flex ml-5 pr-5 gap-4" >
            <span className="relative group" onClick={async () => {
                setIsPublic(!isPublic)
                viewHandling();
                const value = await StatusUpdatePublicOrPrivate(data);
                console.log(value);

            }
            }>
                {isPublic ? <LuEarth /> : <FaLock />}
                <span className="absolute w-40 h-6  hidden group-hover:block text-center top-0 bg-yellow-500/70 text-black dark:text-white p-1 rounded-full text-xs right-7">{isPublic ? "Anyone can see" : "Unauthorize can't see"}</span>
            
            </span>
            <span className="relative group text-yellow-400" >
                {isView ? <FaStar /> : <FaRegStar />}
                <span className="absolute w-40 h-6  hidden group-hover:block text-center top-0 bg-yellow-500/70 text-black dark:text-white p-1 rounded-full text-xs right-7">{isPublic ? "Reviewed" : "UnViewed"}</span>
            </span>
        </div>
    );
}