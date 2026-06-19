import { ServerMutation } from "./mutation/post";

export const subscriptionUpdate = async (data) => {
    const res = await ServerMutation(`api/subscription/update/${data.id}`, data);
    return res;
}