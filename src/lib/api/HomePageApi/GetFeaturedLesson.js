import { ServerMutationGet } from "../mutation/get"

export const GetFeaturedLesson = async (session) => {
    const res = await ServerMutationGet(`api/public/lesson`);
    return res;
}