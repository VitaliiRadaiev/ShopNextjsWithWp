export const TAGS = {
    categories: 'Categories',
    products: 'Products',
    product: 'Product'
}

export async function fetchApi({ query, variables, options, headers, sessionToken, authToken}: {
    query: string,
    variables?: Record<string, any>,
    options?: {
        next?: NextFetchRequestConfig,
        cache?: RequestCache
    },
    headers?: Record<string, string>
    sessionToken?: string;
    authToken?: string;
}
) {
    const headerSessionToken = sessionToken ? { 'woocommerce-session': `Session ${sessionToken}` } : undefined;
    const headerAuthToken = authToken ? { 'Authorization': `Bearer ${authToken}` } : undefined;

    const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            ...headerSessionToken,
            ...headerAuthToken,
            ...headers
        },
        body: JSON.stringify({
            query,
            variables
        }),
        ...options
    })
    const data = await res.json();
    return { res, data };
}