import { ServerMutationGet } from "../mutation/get";


export const LessonDetails = async (id, session, token) => {
    const data = await ServerMutationGet(`api/lesson/details/${id}`, session, token);
    return data;
}