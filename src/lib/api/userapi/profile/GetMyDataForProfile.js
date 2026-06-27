import { ServerMutationGet } from "../../mutation/get"
 

export const GetMyDataForProfile = async (MyId, session, token) => {
    const res = await ServerMutationGet(`api/my-data-for-profile/${MyId}`, session, token)
    return res
}