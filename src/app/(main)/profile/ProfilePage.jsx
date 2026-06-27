'use client'
import NavigationDrowerProfile from "@/components/profilepage/NavigationDrowerProfile";
import { UploadImageForProfile } from "@/lib/api/userapi/profile/UploadImageForProfile";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React, { useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { toast } from "react-toastify";

const ProfilePage = ({ featuredLessons, token, coverPhoto }) => {
  const [userDatai, setUserData] = useState('')
  console.log(userDatai);

  const { data: session } = authClient.useSession();
  const user = session?.user
  const userId = session?.user?.id;
  console.log(user, "MY User Id is");

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image Size Should be less then 5 MB');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });
      const imgData = await response.json();
      const image = imgData?.data?.url;
      const data = { coverImage: image };
      const imageForProfile = await UploadImageForProfile(userId, data, token)
      setUserData(imageForProfile)

    } catch (err) {
      toast.error('Image upload fail');
    }
  };
  console.log(user);

  return (
    <div className="min-h-screen bg-base-200 py-6 sm:py-8 md:py-10 px-3 sm:px-4 md:px-6">
      <NavigationDrowerProfile />
      <div className="max-w-5xl mx-auto">
        {/* Profile Card */}
        <div className="bg-base-100 rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl overflow-hidden">
          {/* Cover */}
          <div
            style={{
              backgroundImage: coverPhoto
                ? `url(${coverPhoto})`
                : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="relative text-center pt-6 sm:pt-8 md:pt-10 z-10 h-32 sm:h-40 md:h-52 lg:h-64 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <label htmlFor="imageUrl" className="absolute top-3 right-3 cursor-pointer">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60 transition">
                <LuImagePlus className="text-white text-xl" />
              </div>
              <input
                id="imageUrl"
                name="imageUrl"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </label>
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
                <button className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-tl-2xl rounded-br-2xl bg-gradient-to-r from-purple-500 to-blue-600 text-white text-xs sm:text-sm md:text-base font-medium shadow-md sm:shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap">
                  Edit Profile
                </button>
              </Link>
              <Link href='/user/dashboard/my-lessons'>
                <button className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 rounded-tl-2xl rounded-br-2xl bg-gradient-to-r from-purple-500 to-blue-600 text-white text-xs sm:text-sm md:text-base font-medium shadow-md sm:shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap">
                  View My Lessons
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-10">
        <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-md shadow-slate-200/40 dark:border-slate-700 dark:bg-slate-950/95">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">User posts</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
                Latest lessons by {user?.name || 'this creator'}
              </h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              A curated list of public lessons styled like featured cards.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
            {featuredLessons.map((lesson) => (
              <article
                key={lesson._id}
                className="group overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-950"
              >
                <div className="relative h-56 overflow-hidden bg-slate-200">
                  <img
                    src={lesson.lessonPhoto}
                    alt={lesson.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-900">
                    {lesson.accessLevel}
                  </span>
                </div>
                <div className="p-5 bg-linear-to-t from-purple-600 to-blue-600/70">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
                      {lesson.category}
                    </span>
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-700">
                      {lesson.date}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {lesson.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-white line-clamp-3">
                    {lesson.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between text-sm text-white ">
                    <span>{lesson.likes || 0} likes</span>
                    <Link href={`/lesson-details/${lesson._id}`} >
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-tr-2xl rounded-bl-2xl border border-neutral-300 bg-linear-to-r from-purple-500 to-blue-500 text-white px-4 py-1.5 text-xs font-medium shadow-sm transition hover:border-red-500 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        View Details
                      </button>

                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage; 