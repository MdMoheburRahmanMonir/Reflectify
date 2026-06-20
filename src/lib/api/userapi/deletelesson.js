import { ServerMutationDelete } from "../mutation/delete";



export const DeleteUserLessons = async (lesson) => {
    const data = await ServerMutationDelete(`api/user/dashboard/delete-lesson/${lesson._id}`, lesson);
    return data;
};
