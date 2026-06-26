'use client'
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { IoLogoGithub } from "react-icons/io";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LuEyeClosed, LuEye } from "react-icons/lu";
import { useState } from "react";
import { toast } from "react-toastify";
import { useLottie } from "lottie-react";
import login from "./login.json";
import { Description, FieldError, Input, Label, TextField } from "@heroui/react";

import { useRouter } from "next/navigation";




export default function LoginPage() { 
    const router = useRouter();
    const { data: session } = authClient.useSession();
    if (session?.user) {
        router.push('/') 
    }; 

    const options = {
        animationData: login,
        loop: true
    };

    const { View } = useLottie(options);


    const [isLoading, setIsLoading] = useState(false);
    const [eye, setEye] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries()); 

        const { data: loginData, error } = await authClient.signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: true,
            callbackURL: "/",
        }, {
            onSuccess: (ctx) => {
                toast.success('Login Success!')
            },
            onError: (ctx) => {
                toast.error('Login Fail!')
            }
        }); 
        setIsLoading(false);
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    return (
        <main className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-12">
            {/* Animated gradient background */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950/30 dark:to-slate-900" />

            {/* Animated orbs */}
            <motion.div
                className="fixed top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:bg-blue-600 dark:opacity-10 -z-10"
                animate={{
                    y: [0, 50, 0],
                    x: [0, 30, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                }}
            />
            <motion.div
                className="fixed bottom-20 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:bg-pink-600 dark:opacity-10 -z-10"
                animate={{
                    y: [0, -50, 0],
                    x: [0, -30, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: 1,
                }}
            />
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Left: Lottie animation (hidden on small screens) */}
                <div className="hidden md:flex items-center justify-center">
                    <div className="w-full max-w-lg p-6">
                        {View}
                    </div>
                </div>

                <motion.div
                    className="w-full"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div
                        variants={itemVariants}
                        className="rounded-2xl border border-white/20 bg-white/80 dark:bg-slate-950/80 p-8 shadow-2xl backdrop-blur-xl dark:border-slate-800/50 hover:shadow-3xl transition-shadow duration-300"
                    >
                        {/* Header */}
                        <motion.div
                            variants={itemVariants}
                            className="text-center mb-8"
                        >
                            <motion.div

                                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 shadow-lg"
                            >
                                <div className="w-30 rounded-full flex items-center justify-center font-bold shadow-md  ">
                                    <img src="/ChatGPT Image Jun 18, 2026, 10_34_43 AM.png" alt="logo" className="w-full h-full" />
                                </div>
                            </motion.div>
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-semibold">
                                Welcome back
                            </p>
                            <h1 className="mt-3 text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                                Sign in
                            </h1>
                            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                Access your dashboard and continue your journey
                            </p>
                        </motion.div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Email Input */}

                            <TextField variants={itemVariants}
                                isRequired
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                className="w-full"
                                validate={(value) => {
                                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                        return "Please enter a valid email address";
                                    }
                                    return null;
                                }}
                            >
                                <Label>Email</Label>
                                <Input placeholder="john@example.com" className={`w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-500/30`} />
                                <FieldError />
                            </TextField>

                            {/* Password Input */}

                            <TextField variants={itemVariants}
                                isRequired
                                minLength={8}
                                id="password"
                                name="password"
                                autoComplete="password"
                                type={`${!eye ? 'text' : 'password'}`}
                                className="w-full"
                                validate={(value) => {
                                    if (value.length < 8) {
                                        return "Password must be at least 8 characters";
                                    }
                                    if (!/[A-Z]/.test(value)) {
                                        return "Password must contain at least one uppercase letter";
                                    }
                                    if (!/[0-9]/.test(value)) {
                                        return "Password must contain at least one number";
                                    }
                                    return null;
                                }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <Label>Password</Label>
                                    <Label className="text-blue-500 hover:underline cursor-pointer">Forgot Password?</Label>
                                </div>
                                <div className="relative group ">
                                    <Input placeholder="Enter your password" className={`w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-500/30`} />
                                    <div onClick={() => setEye(!eye)}  >
                                        {eye ? <LuEyeClosed className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" /> : <LuEye className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />}
                                    </div>
                                </div>
                                <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                                <FieldError />
                            </TextField>

                            {/* Sign In Button */}
                            <motion.button
                                variants={itemVariants}
                                type="submit"
                                disabled={isLoading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                    />
                                ) : (
                                    <>
                                        Sign in
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </motion.button>
                        </form>

                        {/* Divider */}
                        <motion.div variants={itemVariants} className="my-6 flex items-center gap-3">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700" />
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">OR</span>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-700" />
                        </motion.div>

                        {/* Social Buttons */}
                        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
                            <motion.button
                                onClick={async () => {
                                    setIsLoading(true);
                                    const data = await authClient.signIn.social({
                                        provider: "google",
                                    });
                                    setIsLoading(false);
                                }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex gap-2 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600"
                            >
                                <FcGoogle className="w-5 h-5" />
                                <span>Google</span>
                            </motion.button>

                            <motion.button
                                onClick={async () => {
                                    setIsLoading(true);
                                    const data = await authClient.signIn.social({
                                        provider: "github"
                                    });
                                    setIsLoading(false);
                                }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex gap-2 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/50 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600"
                            >
                                <IoLogoGithub className="w-5 h-5" />
                                <span>GitHub</span>
                            </motion.button>
                        </motion.div>

                        {/* Sign Up Link */}
                        <motion.p variants={itemVariants} className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                            New here?{' '}
                            <Link href="/signup" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                                Create an account
                            </Link>
                        </motion.p>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}
