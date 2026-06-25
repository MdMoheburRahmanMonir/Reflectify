const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


export const ServerMutationGet = async (path, session, token = '') => {
    const res = await fetch(`${baseUrl}/${path}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            ...(token && { token: `Bearer ${token}` }),
            ...(session && { sessions: JSON.stringify(session) }),
        }
    });
    return res.json();
}