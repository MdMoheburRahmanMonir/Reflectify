import { ServerMutationUpdate } from "../../mutation/update";



export const AdminViewOrNot = async (data, token) => {
    data.isViewAdmin = true;
    const res = await ServerMutationUpdate(`api/admin/dashboard/admin-view/${data._id}`, data, token);
    return res;
};
