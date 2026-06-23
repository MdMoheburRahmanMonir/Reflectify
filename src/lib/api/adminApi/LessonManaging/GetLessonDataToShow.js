import { ServerMutationGet } from "../../mutation/get";


export const GetLessonDataToShow = async () => {
    const data = await ServerMutationGet(`api/admin/dashboard/get-lesson`);
    return data;
};
