import { ServerMutationDelete } from "../../mutation/delete";


export const OnlyReportDelete = async (lessonId, data, token) => {
    const res = await ServerMutationDelete(`api/delete-report-only/${lessonId}`, data, token);
    return res;
}