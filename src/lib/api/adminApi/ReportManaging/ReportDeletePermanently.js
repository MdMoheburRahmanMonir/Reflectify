import { ServerMutationDelete } from "../../mutation/delete";


export const ReportDeletePermanently = async (lessonId, data, token) => {
    const res = await ServerMutationDelete(`api/delete-full-report/${lessonId}`, data, token);
    return res;
}