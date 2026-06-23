import { ServerMutationDelete } from "../../mutation/delete";
 

export const DeleteLessonFormAdmin = async (data) => {
    const res = await ServerMutationDelete(`api/admin/dashboard/delete-lesson/${data._id}`, data);
    return res;
};
