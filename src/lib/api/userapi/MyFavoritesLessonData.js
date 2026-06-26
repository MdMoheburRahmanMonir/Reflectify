import { ServerMutationGet } from "../mutation/get";

export const MyFavoritesLessonData = async (userId, session, token) => {
    const data = await ServerMutationGet(`api/user/dashboard/my-favorite-lesson/${userId}`, session, token);
    return data;
};
