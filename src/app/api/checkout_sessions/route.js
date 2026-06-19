import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { planIdList, stripe } from '../../../lib/stripe'
import { userSessionServer } from '@/lib/actions/session'

export async function POST(request) {
    const formData = await request.formData()
    const planId = formData.get('planId')
    const priceId = planIdList[planId];
    const session = await userSessionServer()
    const userEmail = session?.user?.email
    const userUpgrade = 'user_pro'
    console.log(userEmail);

    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            customer_email: `${userEmail}`,
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: 'price_1TjYEA0nredMWTgbCyO8wRJo',
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            metadata: { userUpgrade , userEmail},
            success_url: `${origin}/plans/success?session_id={CHECKOUT_SESSION_ID}`,
            // automatic_tax: { enabled: true },
        });
        return NextResponse.redirect(session.url, 303)
    } catch (err) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }
}