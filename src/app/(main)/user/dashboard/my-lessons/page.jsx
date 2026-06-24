"use client";

import { useEffect, useState } from "react"; 
import { GetUserLessons } from "@/lib/api/userapi/getlessons";
import UserTableData from "@/components/userDashboard/TableData";
import { Database } from "lucide-react";
import { SessionClient } from "@/lib/actions/sessionClient";


export default function MyLessonsPage() {
    const session = SessionClient(); 
    const [lessons, setLessons] = useState([]);  
    useEffect(() => {
        if (!session?.user?.id) return; 
        let canceled = false; 
        async function loadLessons() {
            try {
                const data = await GetUserLessons(session.user.id);
                if (!canceled) {
                    setLessons(data || []);
                }
            } catch (error) {
                console.error("Failed to load lessons", error);
            }
        }

        loadLessons();

        return () => {
            canceled = true;
        };
    }, [session?.user?.id]);


    return (
        <>
            {lessons.length > 0
                ? <UserTableData lessons={lessons} />
                : <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                    <div className="mb-4 rounded-full bg-gray-100 p-5">
                        <Database className="h-12 w-12 text-gray-500" />
                    </div>

                    <h1 className="text-2xl font-bold  ">
                        No Data Available
                    </h1>

                    <p className="mt-2 max-w-md text-gray-500">
                        Try to create some lessons to explore and share together!
                    </p>

                    <div className="mt-6 flex gap-3">
                        <button
                            onClick={() => window.location.reload()}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                        >
                            Refresh
                        </button>

                        <button
                            onClick={() => window.history.back()}
                            className="rounded-lg border px-4 py-2  hover:text-black hover:bg-gray-100"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            }
        </>
    );
}