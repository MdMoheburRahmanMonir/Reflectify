import { ServerMutationDelete } from "../../mutation/delete";


export const OnlyReportDelete = async (lessonId, data) => {
    const res = await ServerMutationDelete(`api/delete-report-only/${lessonId}`, data);
    return res;
}