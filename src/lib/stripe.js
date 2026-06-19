import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const planIdList = {
    'recruiter-growth' : 'price_1TiuIz0nredMWTgbgLQuC7G6',
    'recruiter-enterprise' : 'price_1TivR10nredMWTgbVN7M9A1V',
    'jobseeker-pro' : 'price_1TivSJ0nredMWTgb1LrebPAO',
    'jobseeker-premium' : 'price_1TivVg0nredMWTgbPgJKiaUV',
}