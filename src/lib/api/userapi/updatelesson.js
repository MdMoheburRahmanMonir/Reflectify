import { ServerMutationUpdate } from "../mutation/update";


export const UpdateUserLesson = async (data, token) => {
    const res = await ServerMutationUpdate(`api/user/dashboard/update-lesson/${data.productId}`, data, token)
    return res;
}