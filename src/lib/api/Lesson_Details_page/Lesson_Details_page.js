import { ServerMutationGet } from "../mutation/get";


export const LessonDetails = async (id, session) => {
    const data = await ServerMutationGet(`api/lesson/details/${id}`, session);
    return data;
}