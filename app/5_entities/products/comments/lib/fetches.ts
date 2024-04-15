'use server';

import { fetchApi } from "@/app/6_shared/api/graphqlApi";

export async function fetchProductComments(productSlug: string) {
    const { data } = await fetchApi({
        query: `
        `,
        variables: {

        },
        options: {
            next: {
                revalidate: 600
            }
        }
    })
}