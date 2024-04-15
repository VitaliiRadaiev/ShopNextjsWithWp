'use server';

import { BasketApi } from "../../../5_entities/basket/lib/BasketApi";
import { revalidateTag } from "next/cache";
import { Api } from "@/app/6_shared/api/Api";
import { getJwtFromCookies } from "@/app/6_shared/utils/getJwtFromCookies";
import { fetchApi } from "@/app/6_shared/api/graphqlApi";
import { FragmentCartFields } from "@/app/6_shared/api/fragments";
import { CartType } from "@/app/5_entities/basket";

export async function addProductToBasketAction(sessionToken: string, productId: number) {
    const { data } = await fetchApi({
        query: `
            mutation MyMutation($productId: Int!) {
                addToCart(input: {productId: $productId}) {
                    cart {
                        ${FragmentCartFields}
                    }
                }
            }
        `,
        variables: {
            productId
        },
        sessionToken
    })

    return {
        data: data.data.addToCart.cart,
        errors: data.errors 
    } as {
        data: CartType;
        errors?: {
            message: string;
        }[]
    }
}

export async function removeProductFromBasketAction(sessionToken: string, cartItemKey: string) {
    const { data } = await fetchApi({
        query: `
            mutation removeFromCart($keys: [ID]) {
                removeItemsFromCart(input: {keys: $keys}) {
                    cart {
                        ${FragmentCartFields}
                    }
                }
            }
        `,
        variables: {
            keys: [cartItemKey]
        },
        sessionToken
    })

    return {
        data: data.data.removeItemsFromCart.cart,
        errors: data.errors 
    } as {
        data: CartType;
        errors?: {
            message: string;
        }[]
    }
}

export async function updateBasketItemQuantitiesCountAction(sessionToken: string, cartItemKey: string, quantity: number) {
    const { data } = await fetchApi({
        query: `
            mutation updateItemQuantities($key: ID!, $quantity: Int!) {
                updateItemQuantities(input: {items: {key: $key, quantity: $quantity}}) {
                    cart {
                        ${FragmentCartFields}
                    }
                }
            }
        `,
        variables: {
            key: cartItemKey,
            quantity 
        },
        sessionToken
    })

    return {
        data: data.data.updateItemQuantities.cart,
        errors: data.errors 
    } as {
        data: CartType;
        errors?: {
            message: string;
        }[]
    }
}