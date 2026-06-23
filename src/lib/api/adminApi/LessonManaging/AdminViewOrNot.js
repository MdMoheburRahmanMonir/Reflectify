import { ServerMutationUpdate } from "../../mutation/update";



export const AdminViewOrNot = async (data) => {
    data.isViewAdmin = true;
    const res = await ServerMutationUpdate(`api/admin/dashboard/admin-view/${data._id}`, data);
    return res;
};
