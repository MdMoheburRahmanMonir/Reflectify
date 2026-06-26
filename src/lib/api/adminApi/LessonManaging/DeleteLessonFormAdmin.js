import { ServerMutationDelete } from "../../mutation/delete";


export const DeleteLessonFormAdmin = async (data, token) => {
    const res = await ServerMutationDelete(`api/admin/dashboard/delete-lesson/${data._id}`, data, token);
    return res;
};
