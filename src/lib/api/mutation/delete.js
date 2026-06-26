const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const ServerMutationDelete = async (path, data, token = '') => {
    const res = await fetch(`${baseUrl}/${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            ...(token && { token: `Bearer ${token}` }),
        },
        ...(data && { body: JSON.stringify(data) })
    })
    if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status}`);
    }
    return res.json();
}