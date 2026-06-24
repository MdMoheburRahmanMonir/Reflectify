import { ServerMutationGet } from "../../mutation/get"


export const TotalReportData = async (lessonId) => {  
    const res = await ServerMutationGet(`api/get-all-report-by-lesson-id/${lessonId}`)
    return res;
}