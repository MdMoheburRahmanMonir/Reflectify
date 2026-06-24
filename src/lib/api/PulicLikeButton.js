import { ServerMutationUpdate } from "./mutation/update";


export const PublicLikeButton = async (data) => { 
    const res = await ServerMutationUpdate(`api/like/increment-decrement`, data);
    return res;
}