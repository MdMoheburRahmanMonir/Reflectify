'use client'
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LuEyeClosed, LuEye } from "react-icons/lu";
import { toast } from "react-toastify";
import { useLottie } from "lottie-react";
import registerAnimation from "./register.json";
import { Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";


export default function SignupPage() {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    if (session?.user) {
        router.push('/')
    };
    const [image, setImage] = useState('');
    const [eye, setEye] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    console.log(image);

    const options = {
        animationData: registerAnimation,
        loop: true,
    };

    const { View } = useLottie(options);

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
            const data = await response.json();
            console.log(data)
            setImage(`${data?.data?.url}`);
        } catch (err) {
            toast.error('Image upload fail');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const plan = 'free';

        const { data: signUpData, error } = await authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            image: image,
            role: data.role,
            plan,
            callbackURL: "/login",
        }, {
            onSuccess: () => {
                toast.success('Registration Success!');
            },
            onError: () => {
                toast.error('Registration Fail!');
            },
        });

        setIsLoading(false);

        if (signUpData) {
            router.push('/login');
        }
    };

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
        <main className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-12 w-11/12 mx-auto">
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-950 dark:via-purple-950/30 dark:to-slate-900" />
            <motion.div
                className="fixed top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:bg-blue-600 dark:opacity-10 -z-10"
                animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
                className="fixed bottom-20 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:bg-pink-600 dark:opacity-10 -z-10"
                animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            />

            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
                <motion.div
                    className="rounded-3xl border border-white/20 bg-white/90 dark:bg-slate-950/80 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-800/50"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="text-center mb-8">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 font-semibold">
                            Welcome to
                        </p>
                        <h1 className="mt-3 text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                            Create Account
                        </h1>
                        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                            Let's get started to explore the reflectify world! Create your content and Explore your wisdom with others.
                        </p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <motion.div variants={itemVariants}>
                            <label htmlFor="imageUrl" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                Image Upload
                            </label>
                            <input
                                id="imageUrl"
                                name="imageUrl"
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-500/30"
                            />
                        </motion.div>


                        <TextField variants={itemVariants}
                            isRequired
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            className="w-full "
                        >
                            <Label>Full name</Label>
                            <Input placeholder="Enter Your Name" className={`w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-2 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-500/30`} />
                            <FieldError />
                        </TextField>

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

                        <motion.button
                            variants={itemVariants}
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-2 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                />
                            ) : (
                                <>
                                    Create account
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <motion.p variants={itemVariants} className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
                        Already have an account?{' '}
                        <Link href="/login" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                            Sign in
                        </Link>
                    </motion.p>
                </motion.div>

                <motion.div
                    className="hidden lg:flex items-center justify-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={itemVariants} className="w-full max-w-lg p-6 rounded-3xl backdrop-blur-xl">
                        {View}
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}
