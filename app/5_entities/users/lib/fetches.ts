'use client';
import { getJwtFromCookies } from "@/app/6_shared/utils/getJwtFromCookies";
import { UsersApi } from "./UsersApi";
import { fetchApi } from "@/app/6_shared/api/graphqlApi";
import { FragmentCustomerFields } from "@/app/6_shared/api/fragments";
import { CustomerType } from "./types";

export async function fetchMe(sessionToken: string, authToken: string) {
    const { data } = await fetchApi({
        query: `
            query getCustomer {
                customer {
                    ${FragmentCustomerFields}
                }
            }
        `,
        sessionToken,
        authToken
    });

    return {
        data: data.data.customer,
        errors: data.errors
    } as {
        data: CustomerType | null;
        errors?: {
            message: string;
        }[]
    }
}
