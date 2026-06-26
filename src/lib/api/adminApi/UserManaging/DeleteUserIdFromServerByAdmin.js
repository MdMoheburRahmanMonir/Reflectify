import { ServerMutationDelete } from "../../mutation/delete";


export const DeleteUserFormAdmin = async (clientId, token) => {
    const data = await ServerMutationDelete(`api/admin/dashboard/delete-user/${clientId}`, null, token);
    return data;
};
