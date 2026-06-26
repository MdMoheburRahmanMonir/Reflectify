import { ServerMutationUpdate } from "./mutation/update";


export const PublicSavedButton = async (data, token) => {
    const res = await ServerMutationUpdate(`api/like/saved-unsaved`, data);
    return res;
}