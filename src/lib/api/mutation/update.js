const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const ServerMutationUpdate = async (path, data) => {
    const res = await fetch(`${baseUrl}/${path}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    return res.json();
}