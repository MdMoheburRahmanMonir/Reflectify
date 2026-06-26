
import { ServerMutation } from "../mutation/post"

export const AddLessonApi = async (data, token) => {
    const res = await ServerMutation(`api/user/dashboard/add-lesson/${data.userId}`, data, token)
    return res;
}