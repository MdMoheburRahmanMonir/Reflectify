import { ServerMutationUpdate } from "../../mutation/update";

  
export const UpdateUserRole = async (data) => {
    const response = await ServerMutationUpdate(`api/admin/dashboard/update-user-role/${data.userId}`, data);
    return response;
};
