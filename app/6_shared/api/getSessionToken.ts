'use client';

import { fetchApi } from "./graphqlApi";


export async function fetchSessionToken() {
    const { data } = await fetchApi({
        query: `
            query getSessionToken {
                customer {
                    id
                    sessionToken
                    checkoutUrl
                }
            }
        `
    })
 
    return data.data.customer.sessionToken as string;
}



export async function getSessionToken(forceFetch = false) {
    let sessionToken = localStorage.getItem(process.env.NEXT_PUBLIC_SESSION_TOKEN_LS_KEY as string);
    if (!sessionToken || forceFetch) {
        sessionToken = await fetchSessionToken();
        localStorage.setItem(process.env.NEXT_PUBLIC_SESSION_TOKEN_LS_KEY as string, sessionToken);
    }
    return sessionToken;
}