import { XCircle } from 'lucide-react';
import Link from 'next/link';

const CancelPage = () => {
    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
            <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 opacity-95" />
            <div className="absolute left-[-4rem] top-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div className="absolute right-[-4rem] top-32 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />

            <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
                <div className="grid w-full gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
                    {/* Main Section */}
                    <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur-xl ring-1 ring-white/10 sm:rounded-[40px] sm:p-8">
                        {/* Header */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between lg:items-center">
                            <div className="flex items-start gap-3 sm:items-center sm:gap-4">
                                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-3xl bg-red-500/15 text-red-400 ring-1 ring-red-400/30 sm:h-20 sm:w-20">
                                    <XCircle className="h-10 w-10 sm:h-12 sm:w-12" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs uppercase tracking-[0.3em] text-red-300/80 sm:text-sm">Subscription canceled</p>
                                    <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:mt-3 sm:text-3xl lg:text-4xl">Stripe checkout canceled</h1>
                                </div>
                            </div>
                            <div className="inline-flex flex-shrink-0 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-semibold text-slate-200 ring-1 ring-white/10 sm:px-4 sm:py-2 sm:text-sm">
                                No payment taken
                            </div>
                        </div>

                        {/* Content */}
                        <div className="mt-6 space-y-5 text-slate-300 sm:mt-8 sm:space-y-6">
                            <p className="text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                                Your checkout flow was intentionally stopped before payment completed. Your account was not charged and your current plan remains unchanged.
                            </p>
                            <div className="rounded-[24px] border border-white/10 bg-slate-900/75 p-5 shadow-sm shadow-slate-950/20 sm:rounded-[28px] sm:p-6">
                                <p className="text-xs uppercase tracking-[0.18em] text-slate-500 sm:text-sm">What happens next</p>
                                <ul className="mt-3 space-y-2 text-sm text-slate-300 sm:mt-4 sm:space-y-3 sm:text-base">
                                    <li className="flex gap-2 sm:gap-3">
                                        <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-fuchsia-400 sm:h-2.5 sm:w-2.5" />
                                        <span>No charge was applied to your card.</span>
                                    </li>
                                    <li className="flex gap-2 sm:gap-3">
                                        <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-fuchsia-400 sm:h-2.5 sm:w-2.5" />
                                        <span>You can return to plans or try again later.</span>
                                    </li>
                                    <li className="flex gap-2 sm:gap-3">
                                        <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-fuchsia-400 sm:h-2.5 sm:w-2.5" />
                                        <span>Reach out if you need help finishing your subscription.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-4">
                            <Link
                                href="/plans"
                                className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-900 sm:rounded-3xl"
                            >
                                Return to plans
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95 sm:rounded-3xl"
                            >
                                Continue browsing
                            </Link>
                        </div>

                        {/* Support */}
                        <div className="mt-6 rounded-[24px] border border-slate-700 bg-slate-900/75 p-5 text-sm text-slate-400 sm:mt-8 sm:rounded-[28px] sm:p-6">
                            <p className="font-medium text-slate-100">Need assistance?</p>
                            <p className="mt-2 leading-6 sm:leading-7">
                                Contact our support team at{' '}
                                <a
                                    href="mailto:mdmohiburrahmanmanik@gmail.com"
                                    className="font-semibold text-white underline decoration-slate-500/40 hover:text-fuchsia-300"
                                >
                                    mdmohiburrahmanmanik@gmail.com
                                </a>
                                . We can help with checkout issues or plan questions.
                            </p>
                        </div>
                    </section>

                    {/* Sidebar */}
                    <aside className="rounded-[32px] border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/40 ring-1 ring-white/10 sm:rounded-[40px] sm:p-8">
                        <div className="rounded-[24px] border border-slate-800 bg-slate-950/90 p-5 text-slate-200 shadow-inner shadow-white/5 sm:rounded-[30px] sm:p-6">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 sm:text-sm">Canceled order details</p>
                                <span className="inline-flex w-fit rounded-full bg-red-500/10 px-2 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-red-300 sm:px-3">
                                    Canceled
                                </span>
                            </div>
                            <h2 className="mt-3 text-2xl font-semibold text-white sm:mt-4 sm:text-3xl">Checkout canceled</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-400 sm:mt-3 sm:leading-7">
                                You can retry the checkout process from the plans page or select a different subscription option.
                            </p>
                        </div>

                        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:gap-4">
                            <div className="rounded-[20px] border border-slate-800 bg-slate-950/90 p-4 sm:rounded-[28px] sm:p-5">
                                <p className="text-xs uppercase tracking-[0.25em] text-slate-500 sm:text-sm">Payment result</p>
                                <p className="mt-2 text-lg font-semibold text-white sm:mt-3">$0.00</p>
                            </div>
                            <div className="rounded-[20px] border border-slate-800 bg-slate-950/90 p-4 sm:rounded-[28px] sm:p-5">
                                <p className="text-xs uppercase tracking-[0.25em] text-slate-500 sm:text-sm">Checkout status</p>
                                <p className="mt-2 text-lg font-semibold text-fuchsia-400 sm:mt-3">Canceled</p>
                            </div>
                            <div className="rounded-[20px] border border-slate-800 bg-slate-950/90 p-4 sm:rounded-[28px] sm:p-5">
                                <p className="text-xs uppercase tracking-[0.25em] text-slate-500 sm:text-sm">Recommended action</p>
                                <p className="mt-2 text-sm font-semibold text-white sm:mt-3 sm:text-lg">Return to plans or contact support</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default CancelPage;