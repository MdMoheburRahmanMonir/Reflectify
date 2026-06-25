import { ServerMutationGet } from "../../mutation/get"


export const TotalCollection = async (session) => {
    const res = await ServerMutationGet(`api/admin/dashboard/user-activity`, session);
    return res;
}