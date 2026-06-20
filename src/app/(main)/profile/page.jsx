'use client'
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Profile Card */}
        <div className="bg-base-100 rounded-3xl shadow-xl overflow-hidden">
          {/* Cover */}
          <div className="relative text-center pt-10 z-10 h-52 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="mt-3">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${user?.role === "admin"
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

          <div className="px-8 pb-8 ">
            {/* Avatar */}
            <div className="-mt-20 flex flex-col items-center">
              <img
                src={
                  user?.image ||
                  "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt={user?.name}
                className="w-36 z-20 h-36 rounded-full border-4 border-white object-cover shadow-lg"
              />

              <h1 className="mt-4 text-3xl font-bold text-center">
                {user?.name}
              </h1>

              <p className="text-black dark:text-white ">{user?.email}</p>

              <div className="mt-3">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${user?.role === "admin"
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
            <div className="mt-8 max-w-3xl mx-auto text-center">



              {user?.role === "admin"
                ? <h2 className="text-2xl font-bold mb-4">
                  Administrator Overview
                </h2>
                : <h2 className="text-2xl font-bold mb-4">
                  About This Journey
                </h2>
              }
              {user?.role === "admin"
                ? <p className=" text-gray-800 dark:text-gray-300 leading-relaxed">
                  This profile belongs to a platform administrator dedicated to fostering a safe, inspiring, and knowledge-driven community. Through moderation and community support, they help ensure that meaningful life lessons reach the people who need them most.
                </p>
                : <p className=" text-gray-800 dark:text-gray-300 leading-relaxed">
                  Every life lesson tells a story. This profile represents a unique journey of growth, experiences, challenges, and wisdom gathered through life. By sharing meaningful lessons,  we inspire others to learn, reflect, and become better versions of themselves.
                </p>}
            </div>

            {/* Stats */}
            {user?.role === "user" && <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="bg-base-200 rounded-2xl p-6 text-center">
                <h3 className="text-4xl font-bold text-primary">24</h3>
                <p className="text-gray-800 dark:text-gray-300 mt-2">Lessons Shared</p>
              </div>

              <div className="bg-base-200 rounded-2xl p-6 text-center">
                <h3 className="text-4xl font-bold text-secondary">12</h3>
                <p className="text-gray-800 dark:text-gray-300 mt-2">Favorites Saved</p>
              </div>

              <div className="bg-base-200 rounded-2xl p-6 text-center">
                <h3 className="text-4xl font-bold text-accent">150+</h3>
                <p className="text-gray-800 dark:text-gray-300 mt-2">Community Reactions</p>
              </div>
            </div>}

            {/* Quote */}
            <div className="mt-10 bg-gradient-to-r from-purple-500/50 to-blue-500/50 rounded-tr-full rounded-bl-full p-6 text-center">
              <p className="italic text-lg  dark:text-white text-black">

                {user?.role === "admin"
                  ? "👑 Great communities are built with care, guidance, and a commitment to meaningful learning."
                  : "Life becomes meaningful when lessons learned are shared with others."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link href='/profile/editprofile'>
                <button className="px-6 py-2.5 rounded-tl-full rounded-br-full bg-gradient-to-r from-purple-500 to-blue-600 text-white text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200">
                  Edit Profile
                </button>
              </Link>
              <Link href='/user/dashboard/my-lessons'>
                <button className="px-6 py-2.5 rounded-tl-full rounded-br-full bg-gradient-to-r from-purple-500 to-blue-600 text-white text-sm font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200">
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