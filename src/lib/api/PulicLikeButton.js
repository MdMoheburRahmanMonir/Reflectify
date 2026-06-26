import { ServerMutationUpdate } from "./mutation/update";


export const PublicLikeButton = async (data, token) => {
    const res = await ServerMutationUpdate(`api/like/increment-decrement`, data);
    return res;
}