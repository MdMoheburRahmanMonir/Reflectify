import { ServerMutationUpdate } from "../../mutation/update";
 
export const StatusChangeAction = async (data, value) => {
    data.status = value;
    const res = await ServerMutationUpdate(`api/admin/dashboard/status-update/${data._id}`, data);
    return res;
};
