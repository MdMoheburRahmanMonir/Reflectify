import { ServerMutationGet } from "../mutation/get";


export const GetUserLessons = async (userId) => {
    const data = await ServerMutationGet(`api/user/dashboard/my-lessons/${userId}`);
    return data;
};
