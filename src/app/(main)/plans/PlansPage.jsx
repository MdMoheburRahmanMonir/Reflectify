"use client";

import { motion } from "framer-motion";
import { CiCircleCheck } from "react-icons/ci";
import { RiVipCrownFill } from "react-icons/ri";

export default function PlansPage() {
    const plans = [
        {
            id: "free-plan",
            name: "Free",
            price: "৳0",
            description: "Perfect for preserving your personal wisdom and sharing free life lessons.",
            highlighted: false,
            freePage: true,
            features: [
                "Create up to 20 lessons",
                "Access public free lessons",
                "Save lessons to favorites",
                "Like & comment on lessons",
                "Basic profile badge",
                "Community participation",
            ],
        },
        {
            id: "premium-plan",
            name: "Premium",
            price: "৳1500",
            period: "Lifetime Access",
            description: "Unlock premium content, create premium lessons and enjoy lifetime benefits.",
            highlighted: true,
            freePage: false,
            features: [
                "Unlimited lesson creation",
                "Access all premium lessons",
                "Create premium lessons",
                "Priority listing in public feed",
                "Premium ⭐ contributor badge",
                "Verified community status",
                "Ad-free experience",
                "Lifetime premium access",
            ],
        },
    ];

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 px-4 py-20">
            <div className="max-w-7xl mx-auto">

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold">
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                            }}
                        >
                            <RiVipCrownFill />
                        </motion.div>
                        Premium Membership
                    </span>

                    <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                        Unlock Premium Wisdom
                    </h1>

                    <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400">
                        Upgrade your Digital Life Lessons experience. Access exclusive
                        premium lessons, create premium content, and become a verified
                        contributor in our growing wisdom-sharing community.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${plan.highlighted
                                ? "border-2 border-purple-500 shadow-2xl shadow-amber-500/20 scale-105"
                                : "border border-slate-200 dark:border-slate-700 shadow-lg"
                                } bg-white dark:bg-slate-900`}
                        >
                            {plan.highlighted && (
                                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-5 py-2 rounded-bl-xl text-xs font-bold">
                                    MOST POPULAR ⭐
                                </div>
                            )}

                            <div className="p-8">
                                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                                    {plan.name}
                                </h3>

                                <p className="text-slate-600 dark:text-slate-400 mb-6">
                                    {plan.description}
                                </p>

                                <div className="mb-8">
                                    <span className="text-5xl font-bold text-slate-900 dark:text-white">
                                        {plan.price}
                                    </span>

                                    {plan.period && (
                                        <span className="block mt-2 text-purple-600 font-medium">
                                            {plan.period}
                                        </span>
                                    )}
                                </div>

                                <form
                                    action={
                                        plan.freePage
                                            ? "/"
                                            : "/api/checkout_sessions"
                                    }
                                    method="POST"
                                >
                                    <input
                                        type="hidden"
                                        name="planId"
                                        value={plan.id}
                                    />

                                    <button
                                        type="submit"
                                        className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 mb-8 ${plan.highlighted
                                            ? "bg-linear-to-r from-purple-500 to-blue-500 hover:bg-purple-600 text-white shadow-lg"
                                            : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                                            }`}
                                    >
                                        {plan.name === "Free"
                                            ? "Continue Free"
                                            : "Upgrade to Premium"}
                                    </button>
                                </form>

                                <div className="space-y-4">
                                    {plan.features.map((feature, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-start gap-3"
                                        >
                                            <CiCircleCheck className="text-green-500 text-xl mt-1 flex-shrink-0" />
                                            <span className="text-slate-700 dark:text-slate-300">
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Comparison Table */}
                <div className="mt-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-8 border-b border-slate-200 dark:border-slate-700">
                        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white">
                            Free vs Premium Comparison
                        </h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 dark:bg-slate-800">
                                    <th className="p-4 text-left">Features</th>
                                    <th className="p-4 text-center">Free</th>
                                    <th className="p-4 text-center">Premium ⭐</th>
                                </tr>
                            </thead>

                            <tbody>
                                {[
                                    ["Lesson Creation", "20 Max", "Unlimited"],
                                    ["Public Lessons Access", "✓", "✓"],
                                    ["Premium Lessons Access", "✕", "✓"],
                                    ["Create Premium Lessons", "✕", "✓"],
                                    ["Priority Listing", "✕", "✓"],
                                    ["Premium Badge", "✕", "✓"],
                                    ["Ad-Free Experience", "✕", "✓"],
                                    ["Verified Status", "✕", "✓"],
                                ].map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-t border-slate-200 dark:border-slate-700"
                                    >
                                        <td className="p-4 font-medium">
                                            {row[0]}
                                        </td>
                                        <td className="p-4 text-center">
                                            {row[1]}
                                        </td>
                                        <td className="p-4 text-center text-amber-500 font-semibold">
                                            {row[2]}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* FAQ */}
                <div className="mt-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 md:p-12">
                    <h2 className="text-3xl font-bold text-center mb-10 text-slate-900 dark:text-white">
                        Frequently Asked Questions
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-semibold mb-2">
                                Is Premium a monthly subscription?
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400">
                                No. Premium is a one-time payment of ৳1500 and
                                gives you lifetime access.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">
                                Can I create Premium lessons?
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400">
                                Yes. Premium members can publish Premium-only
                                lessons for other premium users.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">
                                What happens after payment?
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400">
                                Your account is automatically upgraded to Premium
                                through Stripe webhook verification.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold mb-2">
                                Can I access Premium lessons from others?
                            </h4>
                            <p className="text-slate-600 dark:text-slate-400">
                                Absolutely. Premium members can unlock all public
                                premium lessons shared by the community.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

