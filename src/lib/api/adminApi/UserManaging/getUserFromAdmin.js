import { ServerMutationGet } from "../../mutation/get";


export const getUserFromAdmin = async (userId, token, session) => {
    const data = await ServerMutationGet(`api/admin/dashboard/get-user/${userId}`, session, token);
    return data;
};
