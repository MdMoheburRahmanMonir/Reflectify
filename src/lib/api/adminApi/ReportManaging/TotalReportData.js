import { ServerMutationGet } from "../../mutation/get"


export const TotalReportData = async (lessonId, session, token) => {
    const res = await ServerMutationGet(`api/get-all-report-by-lesson-id/${lessonId}`, session, token)
    return res;
}  