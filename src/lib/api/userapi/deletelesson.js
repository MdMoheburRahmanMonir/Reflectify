import { ServerMutationDelete } from "../mutation/delete";



export const DeleteUserLessons = async (data, token) => {
    const GetDataResponse = await ServerMutationDelete(`api/user/dashboard/delete-lesson/${data._id}`, data, token);
    return GetDataResponse;
};
