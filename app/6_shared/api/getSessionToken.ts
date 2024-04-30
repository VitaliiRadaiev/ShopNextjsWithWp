'use client';

import { getAuthToken } from "./getAuthToken";
import { fetchApi } from "./graphqlApi";


export async function fetchSessionToken() {
    const authToken = await getAuthToken();
    let sessionToken: string;

    try {
        const { data } = await fetchApi({
            query: `
                query getSessionToken {
                    customer {
                        sessionToken
                    }
                }
            `,
            authToken: authToken || undefined
        })

        sessionToken = data.data.customer.sessionToken as string;
    } catch (error) {
        throw new Error(String(error));
    }

    return sessionToken;
}



export async function getSessionToken(forceFetch = false) {
    let sessionToken = localStorage.getItem(process.env.NEXT_PUBLIC_SESSION_TOKEN_LS_KEY as string);
    if (!sessionToken || forceFetch) {
        sessionToken = await fetchSessionToken();
        localStorage.setItem(process.env.NEXT_PUBLIC_SESSION_TOKEN_LS_KEY as string, sessionToken);
    }
    return sessionToken;
}