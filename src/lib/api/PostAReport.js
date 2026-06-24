import { ServerMutation } from "./mutation/post";

  
export const PostAReport = async (data) => {
    const res = await ServerMutation(`api/report/post`, data);
    return res;
}