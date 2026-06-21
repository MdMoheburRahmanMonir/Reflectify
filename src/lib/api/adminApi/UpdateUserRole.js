import { ServerMutationUpdate } from "../mutation/update";

 

export const UpdateUserRole = async (data) => {
    const response = await ServerMutationUpdate(`api/admin/dashboard/update-user/${data.userId}`, data);
    return response;
};
