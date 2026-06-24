import { ServerMutationGet } from "../mutation/get"; 

export const MyFavoritesLessonData = async (userId) => {
    const data = await ServerMutationGet(`api/user/dashboard/my-favorite-lesson/${userId}`);
    return data;
};
