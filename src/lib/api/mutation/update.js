const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const ServerMutationUpdate = async (path, data, token = null) => {
    const res = await fetch(`${baseUrl}/${path}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            ...(token && { token: `Bearer ${token}` }),
        },
        ...(data && { body: JSON.stringify(data) })
    })
    return res.json();
}