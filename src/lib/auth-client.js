import { createAuthClient } from "better-auth/react"
import { jwtClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: "https://reflectify-client.vercel.app",
    plugins: [
        jwtClient()
    ],
})

export const { signIn, signUp, useSession } = createAuthClient()