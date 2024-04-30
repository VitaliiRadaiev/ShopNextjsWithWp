'use server';

import { CustomerType } from "@/app/5_entities/users";
import { FragmentCustomerFields } from "@/app/6_shared/api/fragments";
import { fetchApi } from "@/app/6_shared/api/graphqlApi";

interface updateMeData {
    firstName: string;
    lastName: string;
    phone: string;
}

export async function updateMeAction(sessionToken: string, authToken: string, newData: updateMeData) {
    const { data } = await fetchApi({
        query: `
            mutation updateCustomer($firstName: String!, $lastName: String!, $phone: String!) {
                updateCustomer(
                    input: {
                        billing: {
                            firstName: $firstName, 
                            lastName: $lastName, 
                            phone: $phone
                        }
                    }
                ) {
                    customer {
                        ${FragmentCustomerFields}
                    }
                }
            }
        `,
        variables: {
            firstName: newData.firstName,
            lastName: newData.lastName,
            phone: newData.phone,
        },
        sessionToken,
        authToken
    })

    return {
        data: data.data.updateCustomer.customer,
        errors: data.errors
    } as {
        data: CustomerType | null;
        errors?: {
            message: string;
        }[]
    }
}