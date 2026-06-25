import { XCircle } from 'lucide-react';
import Link from 'next/link';

const CancelPage = () => {
    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
            <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 opacity-95" />
            <div className="absolute left-[-4rem] top-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div className="absolute right-[-4rem] top-32 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />

            <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
                <div className="grid w-full gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <section className="rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl ring-1 ring-white/10">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-4">
                                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/15 text-red-400 ring-1 ring-red-400/30">
                                    <XCircle className="h-12 w-12" />
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-[0.3em] text-red-300/80">Subscription canceled</p>
                                    <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">Stripe checkout canceled</h1>
                                </div>
                            </div>
                            <div className="inline-flex rounded-full bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-200 ring-1 ring-white/10">
                                No payment taken
                            </div>
                        </div>

                        <div className="mt-8 space-y-6 text-slate-300">
                            <p className="text-base leading-8 text-slate-400">
                                Your checkout flow was intentionally stopped before payment completed. Your account was not charged and your current plan remains unchanged.
                            </p>
                            <div className="rounded-[28px] border border-white/10 bg-slate-900/75 p-6 shadow-sm shadow-slate-950/20">
                                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">What happens next</p>
                                <ul className="mt-4 space-y-3 text-slate-300">
                                    <li className="flex gap-3">
                                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
                                        No charge was applied to your card.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
                                        You can return to plans or try again later.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
                                        Reach out if you need help finishing your subscription.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            <Link
                                href="/plans"
                                className="inline-flex items-center justify-center rounded-3xl border border-slate-700 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
                            >
                                Return to plans
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:opacity-95"
                            >
                                Continue browsing
                            </Link>
                        </div>

                        <div className="mt-8 rounded-[28px] border border-slate-700 bg-slate-900/75 p-6 text-sm text-slate-400">
                            <p className="font-medium text-slate-100">Need assistance?</p>
                            <p className="mt-2 leading-7">
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

                    <aside className="rounded-[40px] border border-white/10 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40 ring-1 ring-white/10">
                        <div className="rounded-[30px] border border-slate-800 bg-slate-950/90 p-6 text-slate-200 shadow-inner shadow-white/5">
                            <div className="flex items-center justify-between gap-3">
                                <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Canceled order details</p>
                                <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
                                    Canceled
                                </span>
                            </div>
                            <h2 className="mt-4 text-3xl font-semibold text-white">Checkout canceled</h2>
                            <p className="mt-3 text-slate-400 leading-7">
                                You can retry the checkout process from the plans page or select a different subscription option.
                            </p>
                        </div>

                        <div className="mt-8 grid gap-4">
                            <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-5">
                                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Payment result</p>
                                <p className="mt-3 text-lg font-semibold text-white">$0.00</p>
                            </div>
                            <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-5">
                                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Checkout status</p>
                                <p className="mt-3 text-lg font-semibold text-fuchsia-400">Canceled</p>
                            </div>
                            <div className="rounded-[28px] border border-slate-800 bg-slate-950/90 p-5">
                                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Recommended action</p>
                                <p className="mt-3 text-lg font-semibold text-white">Return to plans or contact support</p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
};

export default CancelPage;