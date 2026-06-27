 
import { ServerMutationUpdate } from "../../mutation/update"


export const UploadImageForProfile = async (userId, data, token) => {
    const res = await ServerMutationUpdate(`api/profile-cover-image-upload/${userId}`, data, token)
    return res
}