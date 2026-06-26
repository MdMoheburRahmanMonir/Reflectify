import { ServerMutation } from "./mutation/post";


export const PostACommentToServer = async (data, token) => {
    const res = await ServerMutation(`api/user/comment/post`, data, token );
    return res;
}