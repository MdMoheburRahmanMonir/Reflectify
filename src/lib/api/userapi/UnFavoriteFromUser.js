import { ServerMutationUpdate } from "../mutation/update";


export const UnFavoriteFromUser = async () => {
    const res = await ServerMutationUpdate()
    return res;
}