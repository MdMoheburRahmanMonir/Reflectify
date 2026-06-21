import { ServerMutationDelete } from "../mutation/delete";

  
export const DeleteUserFormAdmin = async (userId) => {
    const data = await  ServerMutationDelete(`api/admin/dashboard/delete-user/${userId}`);
    return data;
};
