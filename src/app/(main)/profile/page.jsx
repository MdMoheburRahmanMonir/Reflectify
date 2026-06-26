'use client' 
import NavigationDrowerProfile from "@/components/profilepage/NavigationDrowerProfile";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user

  return (
    <div className="min-h-screen bg-base-200 py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-6">
      <NavigationDrowerProfile />
      <div className="max-w-5xl mx-auto">
        {/* Profile Card */}
        <div className="bg-base-100 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden">
          {/* Cover */}
          <div className="relative text-center pt-6 sm:pt-8 md:pt-10 z-10 h-32 sm:h-40 md:h-52 lg:h-64 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="mt-2 sm:mt-3">
              <span
                className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${user?.role === "admin"
                  ? "bg-red-100 text-red-600"
                  : "bg-blue-100 text-blue-600"
                  }`}
              >
                {user?.role === "admin"
                  ? "Status: 👑 Admin"
                  : "Status: ✨ Community Member"}
              </span>
            </div>
          </div>

          <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 ">
            {/* Avatar */}
            <div className="-mt-16 sm:-mt-20 md:-mt-24 flex flex-col items-center ">
              <img
                src={
                  user?.image ||
                  "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt={user?.name}
                className="w-24 sm:w-28 md:w-32 lg:w-36 z-20 h-24 sm:h-28 md:h-32 lg:h-36 rounded-full border-3 sm:border-4 bg-black/20 backdrop-blur-2xl border-white object-cover shadow-md sm:shadow-lg"
              />

              <h1 className="mt-3 sm:mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center">
                {user?.name}
              </h1>

              <p className="text-xs sm:text-sm md:text-base text-black dark:text-white mt-1 sm:mt-2 break-all">{user?.email}</p>

              <div className="mt-2 sm:mt-3">
                <span
                  className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${user?.role === "admin"
                    ? "bg-red-100 text-red-600"
                    : "bg-blue-100 text-blue-600"
                    }`}
                >
                  {user?.role === "admin"
                    ? "👑 Admin"
                    : "✨ Community Member"}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6 sm:mt-8 max-w-3xl mx-auto text-center px-2 sm:px-4">
              {user?.role === "admin"
                ? <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4">
                  Administrator Overview
                </h2>
                : <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4">
                  About This Journey
                </h2>
              }
              {user?.role === "admin"
                ? <p className="text-sm sm:text-base text-gray-800 dark:text-gray-300 leading-relaxed">
                  This profile belongs to a platform administrator dedicated to fostering a safe, inspiring, and knowledge-driven community. Through moderation and community support, they help ensure that meaningful life lessons reach the people who need them most.
                </p>
                : <p className="text-sm sm:text-base text-gray-800 dark:text-gray-300 leading-relaxed">
                  Every life lesson tells a story. This profile represents a unique journey of growth, experiences, challenges, and wisdom gathered through life. By sharing meaningful lessons, we inspire others to learn, reflect, and become better versions of themselves.
                </p>}
            </div>

            {/* Stats */}
            {user?.role === "user" && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-10 px-2 sm:px-0">
              <div className="bg-base-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">24</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-800 dark:text-gray-300 mt-2">Lessons Shared</p>
              </div>

              <div className="bg-base-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary">12</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-800 dark:text-gray-300 mt-2">Favorites Saved</p>
              </div>

              <div className="bg-base-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent">150+</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-800 dark:text-gray-300 mt-2">Community Reactions</p>
              </div>
            </div>}

            {/* Quote */}
            <div className="mt-6 sm:mt-8 md:mt-10 bg-gradient-to-r from-purple-500/50 to-blue-500/50 rounded-tr-2xl sm:rounded-tr-3xl rounded-bl-2xl sm:rounded-bl-3xl p-4 sm:p-5 md:p-6 text-center mx-2 sm:mx-0">
              <p className="italic text-xs sm:text-sm md:text-lg dark:text-white text-black">
                {user?.role === "admin"
                  ? "👑 Great communities are built with care, guidance, and a commitment to meaningful learning."
                  : "Life becomes meaningful when lessons learned are shared with others."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 px-2 sm:px-0">
              <Link href='/profile/editprofile'>
                <button className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-tl-full rounded-br-full bg-gradient-to-r from-purple-500 to-blue-600 text-white text-xs sm:text-sm md:text-base font-medium shadow-md sm:shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap">
                  Edit Profile
                </button>
              </Link>
              <Link href='/user/dashboard/my-lessons'>
                <button className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-tl-full rounded-br-full bg-gradient-to-r from-purple-500 to-blue-600 text-white text-xs sm:text-sm md:text-base font-medium shadow-md sm:shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap">
                  View My Lessons
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 