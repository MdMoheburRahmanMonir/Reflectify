import { redirect } from 'next/navigation'
import { CheckCircle } from 'lucide-react'
import { stripe } from '@/lib/stripe'
import { userSessionServer } from '@/lib/actions/session';
import { subscriptionUpdate } from '@/lib/api/subscriptionUpdate';


export default async function Success({ searchParams }) {
    const { session_id } = await searchParams
    const session = await userSessionServer();
    const userId = session?.user?.id;
    console.log(userId);

    if (!session_id) {
        throw new Error('Please provide a valid session_id (`cs_test_...`)')
    }

    const {
        status,
        customer_details: { email: customerEmail }, metadata
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (status === 'open') {
        redirect('/')
    }

    if (status === 'complete') {
        const data = {
            id: userId,
            plan: metadata.userUpgrade,
            userEmail: metadata.userEmail,
        }
        console.log(data);

        const update = await subscriptionUpdate(data)
        const res = await update;
        console.log(res);

        return (
            <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
                <div className="w-full max-w-lg rounded-3xl bg-white p-10 shadow-xl border border-gray-100">
                    {/* Success Icon */}
                    <div className="flex justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle className="h-12 w-12 text-green-600" />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="mt-6 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Payment Successful 🎉
                        </h1>
                        <p className="mt-3 text-gray-600">
                            Thank you for your purchase. Your order has been confirmed.If premium plan is not work then logout and login again to reflectify dashboard. Enjoy your premium plan!
                        </p>
                    </div>

                    {/* Email Info */}
                    <div className="mt-8 rounded-2xl bg-gray-50 p-5 text-center">
                        <p className="text-sm text-gray-500">
                            Confirmation email sent to
                        </p>
                        <p className="mt-1 font-semibold text-gray-900 break-all">
                            {customerEmail}
                        </p>
                    </div>

                    {/* Support */}
                    <div className="mt-6 text-center text-sm text-gray-500">
                        Need help? Contact us at{' '}
                        <a
                            href="mailto:mdmohiburrahmanmanik@gmail.com"
                            className="font-medium text-blue-600 hover:text-blue-700"
                        >
                            mdmohiburrahmanmanik@gmail.com
                        </a>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex gap-3">
                        <a
                            href="/"
                            className="flex-1 rounded-xl border border-gray-300 px-5 py-3 text-center font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Back Home
                        </a>

                        <a
                            href="/user/dashboard"
                            className="flex-1 rounded-xl bg-black px-5 py-3 text-center font-medium text-white hover:bg-gray-800"
                        >
                            View Orders
                        </a>
                    </div>
                </div>
            </main>
        )
    }
}