import { authClient } from "../auth-client";

export const userSessionClient = () => {
    const { data: session } = authClient.useSession();
    return session;
}