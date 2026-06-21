import { ServerMutationUpdate } from "../mutation/update";

  
export const UpdateUserPlan = async (data) => {
    const response = await ServerMutationUpdate(`api/admin/dashboard/update-user-plan/${data.userId}`, data);
    return response;
};
