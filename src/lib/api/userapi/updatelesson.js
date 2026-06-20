import { ServerMutationUpdate } from "../mutation/update";
 

export const UpdateUserLesson = async (data) => {
    console.log("my id is" ,data.productId)
    const res = await  ServerMutationUpdate(`api/user/dashboard/update-lesson/${data.productId}`, data)
    return res;
}