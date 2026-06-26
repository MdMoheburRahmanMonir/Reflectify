"use client"
import Link from 'next/link'; 
import { useState } from "react";
import { FaEdit, FaQuoteLeft, FaRegUserCircle } from "react-icons/fa";
import { usePathname } from 'next/navigation'; 
import { FiMenu, FiX } from 'react-icons/fi';

const navItems = [
    { icon: FaRegUserCircle, label: "Profile", href: "/profile" },
    { icon: FaEdit, label: "Edit Profile", href: "/profile/editprofile" },
    { icon: FaQuoteLeft, label: "FAQ", href: "/profile/faq" },
];

const NavigationDrowerProfile = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="lg:hidden px-4 py-4">
            {/* Menu Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 shadow-md rounded-xl"
            >
                <FiMenu className="h-5 w-5" />
                Menu
            </button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Drawer */}
            <div className={` fixed top-0 left-0 h-full w-72 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-r border-slate-200 dark:border-white/10 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} `}>
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 top-4 h-10 w-10 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                >
                    <FiX />
                </button>
                {/* Header */}
                <div className="p-6 pt-8">
                    <h2 className="font-bold text-xl bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
                        Reflectify
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Dashboard Navigation
                    </p>
                </div>
                {/* Nav Items */}
                <nav className="flex flex-col gap-2 p-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={` flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300
                                    ${active
                                        ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg"
                                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"}
                                `}
                            >
                                <Icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

export default NavigationDrowerProfile; 