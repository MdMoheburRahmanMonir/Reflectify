const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const ServerMutationGet = async (path, session) => {
    const res = await fetch(`${baseUrl}/${path}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            ...(session && { "session": JSON.stringify(session) })
        }
    });
    // if (!res.ok) throw new Error(`API error: from GetApi ${res.status}`);
    return res.json();
}