import { ServerMutationGet } from "../mutation/get";


export const getUserFromAdmin = async (userId) => {
    const data = await ServerMutationGet(`api/admin/dashboard/get-user/${userId}`);
    return data;
};
