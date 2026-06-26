import { ServerMutationGet } from "../../mutation/get";

  
export const GetReportForAdminFromServer = async (session, token) => {
    const data = await ServerMutationGet(`api/admin/dashboard/get-report`, session, token);
    return data;
};
