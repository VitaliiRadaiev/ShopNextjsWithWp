export const TAGS = {
    categories: 'Categories',
    products: 'Products',
    product: 'Product'
}

export async function fetchApi({ query, variables, options, headers, sessionToken}: {
    query: string,
    variables?: Record<string, any>,
    options?: {
        next?: NextFetchRequestConfig,
        cache?: RequestCache
    },
    headers?: Record<string, string>
    sessionToken?: string;
}
) {
    const setHeaderToken = sessionToken ? { 'woocommerce-session': `Session ${sessionToken}` } : {} as Record<string, string>;

    const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            ...setHeaderToken,
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