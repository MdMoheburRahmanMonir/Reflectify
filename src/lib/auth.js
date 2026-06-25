import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db('jobportal');

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    trustedOrigins: [
        "https://reflectify-client.vercel.app",
        "https://*.vercel.app",
        "http://localhost:3000"
    ],
    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),

    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60 * 24 * 7, // 7 days
            strategy: "jwt"
        },
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
            },
            plan: {
                type: "string",
            }
        }
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    return {
                        data: {
                            ...user,
                            role: user.role ?? "user",
                            plan: user.plan ?? "free",
                        }
                    };
                }
            }
        }
    },
    plugins: [
        jwt(),
    ]
});