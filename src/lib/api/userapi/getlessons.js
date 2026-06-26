import { ServerMutationGet } from "../mutation/get";


export const GetUserLessons = async (userId, session, token) => {
    const data = await ServerMutationGet(`api/user/dashboard/my-lessons/${userId}`, session, token);
    return data;
};
