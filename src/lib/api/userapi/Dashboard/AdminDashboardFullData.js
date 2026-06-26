import { ServerMutationGet } from "../../mutation/get";


export const AdminDashboardFullData = async (session, token) => {
    const res = await ServerMutationGet(`api/user/dashboard/all-summary/${session?.user?.id}`, session,token);
    return res;
}