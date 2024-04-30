'use server';

import { getJwtFromCookies } from "@/app/6_shared/utils/getJwtFromCookies";
import { OrderType, OrdersApi } from "..";
import { fetchApi } from "@/app/6_shared/api/graphqlApi";
import { FragmentOrderFields } from "@/app/6_shared/api/fragments";

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

export async function fetchOrders(sessionToken: string) {
    const { data } = await fetchApi({
        query: `
            query lastOrder {
                customer {
                    orders(where: {orderby: {field: DATE}}, first: 100) {
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
        data: data.data.customer.orders.nodes,
        errors: data.errors 
    } as {
        data: OrderType[];
        errors?: {
            message: string;
        }[]
    }
}