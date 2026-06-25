import { NextResponse } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

// This function can be marked `async` if using `await` inside
export async function proxy(request) {


    const session = await auth.api.getSession({
        headers: await headers()
    })
    if (session?.user) {
        return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/login', request.url))

}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
    matcher: ["/plans", "/plans/:path*", "/profile", "/user/dashboard", "/user/dashboard/:path*", "/admin/dashboard", "/admin/dashboard/:path*"],
}