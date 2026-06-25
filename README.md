# Reflectify Client

Reflectify is a personal growth and learning platform built with Next.js and React. It helps users discover, save, and share life lessons through a community-driven experience with premium access, user profiles, lessons management, and admin moderation.

## Key Features

- Home landing page with featured lessons, most saved lessons, community insights, and growth-focused content.
- Public Lessons page with search, filtering, pagination, like/save actions, and premium access controls.
- Authenticated user dashboard for managing personal lessons, editing lesson details, and deleting content.
- Profile and edit-profile flows with image upload support.
- Plan upgrade flow with Stripe checkout and premium plan validation.
- Admin dashboard for moderation, reporting, and user/lesson management.
- Theme toggle, responsive navigation, and mobile-friendly UI.

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS v4
- HeroUI React
- Better Auth with MongoDB adapter
- Stripe payments
- Framer Motion / Lottie for animations
- React Toastify for notifications
- Swiper for hero carousel

## Getting Started

### Install dependencies

```bash
cd reflectify-client
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm run start
```

## Environment Variables

Create a `.env.local` file in `reflectify-client` and add the following variables:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_IMAGE_UPLOAD_API=<your_imgbb_api_key>
MONGO_DB_URI=<your_mongodb_connection_string>
GITHUB_CLIENT_ID=<your_github_oauth_client_id>
GITHUB_CLIENT_SECRET=<your_github_oauth_client_secret>
GOOGLE_CLIENT_ID=<your_google_oauth_client_id>
GOOGLE_CLIENT_SECRET=<your_google_oauth_client_secret>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
```

> Note: `NEXT_PUBLIC_BASE_URL` is used for API requests, and `STRIPE_SECRET_KEY` is used by Stripe server-side code.

## Project Structure

- `src/app` — Next.js app routes, layouts, and pages.
- `src/components` — Reusable UI components, dashboard widgets, and feature sections.
- `src/lib` — Auth setup, Stripe integration, API clients, and helper actions.
- `src/app/api` — Stripe checkout API route.

## Authentication

This app uses `better-auth` for email/password plus GitHub and Google OAuth providers. New users are created with a default role of `user` and a default plan of `free`.

## Deployment

This project is ready to deploy on Vercel or any Node.js hosting provider that supports Next.js. Make sure the environment variables are configured in your deployment platform.

## Notes

- The client expects a backend that handles lessons, user profiles, and payment flows.
- Premium lesson access is gated based on the user plan.
- Image uploads use `imgbb` with `NEXT_PUBLIC_IMAGE_UPLOAD_API`.

## Contact

For support or questions, reach out to `mdmohiburrahmanmanik@gmail.com`.
