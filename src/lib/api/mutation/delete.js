const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const ServerMutationDelete = async (path, lesson) => {
    const res = await fetch(`${baseUrl}/${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        ...(lesson && { body: JSON.stringify(lesson) })
    })
    if (!res.ok) {
        throw new Error(`Failed to fetch lessons: ${res.status}`);
    }
    return res.json();
}