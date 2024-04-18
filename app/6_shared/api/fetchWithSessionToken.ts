import { getSessionToken } from "./getSessionToken"

const targetErrors = [
    'The iss do not match with this server',
    'invalid-secret-key | Expired token',
    'Signature verification failed',
    'Expired token',
    'Wrong number of segments',
];

export async function fetchWithSessionToken<T>(
    fetcher: (sessionToken: string) => Promise<{ data: T, errors?: { message: string }[] }>
): Promise<T> {
    const sessionToken = await getSessionToken();

    const res = await fetcher(sessionToken);
    console.log(res);
    
    if (res.errors) {
        const isSessionError = res.errors.some(error => targetErrors.includes(error.message))
        
        if(isSessionError) {
            const sessionToken = await getSessionToken(true);
            const res = await fetcher(sessionToken);

            if(res.errors) {
                throw new Error('[graphql errors]' + res.errors.map(e => e.message).join(' ,'))
            } else {
                return res.data
            }

        } else {
            throw new Error('[graphql errors]' + res.errors.map(e => e.message).join(' ,'))
        }

    }

    return res.data;
}
