import { getJwtFromCookies } from "@/app/6_shared/utils/getJwtFromCookies";
import { BasketApi } from "./BasketApi";
import { FragmentCartFields } from "@/app/6_shared/api/fragments";
import { fetchApi } from "@/app/6_shared/api/graphqlApi";
import { CartType } from "./types";

export async function fetchBasket() {
    const jwt = await getJwtFromCookies();
    if (!jwt) return;
    return await BasketApi.getBasket(jwt);
}

export async function fetchCart(sessionToken: string, authToken?:string) {
    const res = await fetchApi({
        sessionToken,
        authToken,
        query: `
                query getCart {
                    cart {
                        ${FragmentCartFields}
                    }
                }
            `
    })

    return {
        data: res.data.data.cart,
        errors: res.data.errors 
    } as {
        data: CartType;
        errors?: {
            message: string;
        }[]
    }
}