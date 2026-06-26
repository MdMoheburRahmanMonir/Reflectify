import { ServerMutationUpdate } from "../../mutation/update";


export const UpdateUserPlan = async (data, token) => {
    const response = await ServerMutationUpdate(`api/admin/dashboard/update-user-plan/${data.userId}`, data, token);
    return response;
};
