const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const ServerMutation = async (path, data, token) => {
    const res = await fetch(`${baseUrl}/${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token && { token: `Bearer ${token}` }),
        },
        ...(data && { body: JSON.stringify(data) })
    })
    return res.json();
}