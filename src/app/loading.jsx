"use client";

import Lottie from "lottie-react";
import loading from "./loading.json";

const LoadingPage = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-950 dark:to-black relative overflow-hidden">

            {/* background glow */}
            <div className="absolute w-72 h-72 bg-purple-300/30 blur-3xl rounded-full top-10 left-10"></div>
            <div className="absolute w-72 h-72 bg-indigo-300/30 blur-3xl rounded-full bottom-10 right-10"></div>

            {/* Lottie animation */}
            <div className="w-72 sm:w-96">
                <Lottie animationData={loading} loop={true} />
            </div>

            
           
        </div>
    );
};

export default LoadingPage;