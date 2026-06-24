import { ServerMutationDelete } from "../../mutation/delete";


export const ReportDeletePermanently = async (lessonId, data) => {
    const res = await ServerMutationDelete(`api/delete-full-report/${lessonId}`, data);
    return res;
}