import { ServerMutationGet } from "../mutation/get";


export const AllLessonForLessonPage = async () => {
    const res = await ServerMutationGet(`api/public/lesson/full`);
    return res;
}