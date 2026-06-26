import { ServerMutationGet } from "../../mutation/get";


export const GetLessonDataToShow = async (session, token) => {
    const data = await ServerMutationGet(`api/admin/dashboard/get-lesson`, session, token);
    return data;
};
