import { ServerMutationGet } from "../../mutation/get"


export const TotalCollection = async (session, token = '') => {
    const res = await ServerMutationGet(`api/admin/dashboard/user-activity`, session, token);
    return res;
}