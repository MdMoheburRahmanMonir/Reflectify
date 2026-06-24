import { authClient } from "../auth-client";

export const  SessionClient = () => {
    const { data: session } = authClient.useSession();
    return session;
}