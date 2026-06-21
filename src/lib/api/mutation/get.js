const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const ServerMutationGet = async (path) => {
    const res = await fetch(`${baseUrl}/${path}`);
    if (!res.ok) {
        throw new Error(`Failed to fetch lessons: ${res.status}`);
    }
    return res.json();
}