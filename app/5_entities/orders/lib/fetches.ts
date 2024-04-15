'use server';

import { getJwtFromCookies } from "@/app/6_shared/utils/getJwtFromCookies";
import { OrderType, OrdersApi } from "..";
import { fetchApi } from "@/app/6_shared/api/graphqlApi";
import { FragmentProductCardFields } from "@/app/6_shared/api/fragments";

const FragmentOrderFields = `
    date
    billing {
        email
        firstName
        lastName
        phone
    }
    databaseId
    lineItems {
        nodes {
            quantity
            total
            product {
                node {
                    ${FragmentProductCardFields}
                }
            }
        }
    }
    orderNumber
    paymentMethod
    paymentMethodTitle
    shipping {
        address1
    }
    status
    total
`;

export async function fetchHistory() {
    const jwt = await getJwtFromCookies();
    if(!jwt) return;
    return OrdersApi.getHistory(jwt);
}

export async function fetchOrderById(orderId: number) {
    return OrdersApi.getOrderById(orderId);
}

export async function fetchLastOrder(sessionToken: string) {
    const { data } = await fetchApi({
        query: `
            query lastOrder {
                customer {
                    orders(where: {orderby: {field: DATE}}, first: 1) {
                        nodes {
                            ${FragmentOrderFields}
                        }
                    }
                }
            }
        `,
        sessionToken
    })

    return {
        data: data.data.customer.orders.nodes[0] || null,
        errors: data.errors 
    } as {
        data: OrderType | null;
        errors?: {
            message: string;
        }[]
    }
}