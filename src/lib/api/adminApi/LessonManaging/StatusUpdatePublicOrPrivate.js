import { ServerMutationUpdate } from "../../mutation/update";

 

export const StatusUpdatePublicOrPrivate = async (data, token) => {
    const res = await  ServerMutationUpdate(`api/admin/dashboard/status-public-or-private-lesson/${data._id}`, data, token);
    return res;
};
