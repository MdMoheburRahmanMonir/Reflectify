import { ServerMutationGet } from "../../mutation/get";

  
export const GetReportForAdminFromServer = async (session) => {
    const data = await ServerMutationGet(`api/admin/dashboard/get-report`, session);
    return data;
};
