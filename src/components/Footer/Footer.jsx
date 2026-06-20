import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-white text-gray-700 dark:bg-[#0B0F1A] dark:text-gray-300 pt-16 pb-8 px-6 mt-20 transition-colors duration-300">

            {/* TOP GRID */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* BRAND */}
                <div>
                    <Link href="/" className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-md bg-gray-100 dark:bg-white">
                            <img
                                src="/ChatGPT Image Jun 18, 2026, 10_34_43 AM.png"
                                alt="logo"
                                className="w-8 h-8"
                            />
                        </div>

                        <span className="font-bold text-2xl tracking-tight bg-gradient-to-l from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            REFLECTIFY
                        </span>
                    </Link>

                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        A platform to preserve wisdom, reflect on life experiences, and grow
                        through shared human insights.
                    </p>

                    {/* SOCIALS */}
                    <div className="flex gap-3 mt-5">
                        <Link
                            href="https://x.com/MohiburMd2288"
                            target="_blank"
                            className="p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-blue-100 dark:hover:bg-blue-500/30 transition"
                        >
                            <FaXTwitter />
                        </Link>

                        <Link
                            href="https://web.facebook.com/mdmohiburrahmanmanik0"
                            target="_blank"
                            className="p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-blue-100 dark:hover:bg-blue-500/30 transition"
                        >
                            <FaFacebookF />
                        </Link>

                        <Link
                            href="https://www.linkedin.com/in/md-mohebur-rahman-monir/"
                            target="_blank"
                            className="p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-blue-100 dark:hover:bg-blue-500/30 transition"
                        >
                            <FaLinkedinIn />
                        </Link>

                        <Link
                            href="https://www.instagram.com/mdmohiburrahmanmanik0/"
                            target="_blank"
                            className="p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-blue-100 dark:hover:bg-blue-500/30 transition"
                        >
                            <FaInstagram />
                        </Link>
                    </div>
                </div>

                {/* QUICK LINKS */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Quick Links
                    </h3>

                    <div className="flex flex-col gap-3 text-sm">
                        <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                            Home
                        </Link>

                        <Link href="/user/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                            Dashboard
                        </Link>

                        <Link href="/public-post" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                            Public Lessons
                        </Link>

                        <Link href="/plans" className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                            Pricing
                        </Link>
                    </div>
                </div>

                {/* FEATURES */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Features
                    </h3>

                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li>Save & Favorite Lessons</li>
                        <li>Premium Learning Access</li>
                        <li>Community Insights</li>
                        <li>Emotion-based Filtering</li>
                        <li>Personal Growth Tracking</li>
                    </ul>
                </div>

                {/* CONTACT */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Contact
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Email: mdmohiburrahmanmanik@gmail.com
                    </p>

                    <p className="text-sm mt-2 mb-5 text-gray-600 dark:text-gray-400">
                        Sylhet, Bangladesh
                    </p>

                    <Link href="/contact" className="">
                        <button
                            className="relative flex items-center  px-6 py-3 overflow-hidden font-medium transition-all bg-indigo-500 rounded-md group"
                        >
                            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                            </span>
                            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white" >
                            </span>
                            <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4" >
                                <span
                                    className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
                                ></span>
                            </span>
                            <span
                                className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
                            ></span>
                            <span
                                className="relative w-full px-20 text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
                            >
                                Contact Us
                            </span>
                        </button>
                    </Link>
                </div>
            </div>

            {/* DIVIDER */}
            <div className="border-t border-gray-200 dark:border-white/10 my-10"></div>

            {/* BOTTOM */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">

                <p>© {new Date().getFullYear()} Reflectify. All rights reserved.</p>

                <div className="flex gap-6 mt-4 md:mt-0">
                    <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer">
                        Privacy Policy
                    </span>
                    <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer">
                        Terms
                    </span>
                    <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer">
                        Cookies
                    </span>
                </div>
            </div>
        </footer >
    );
}