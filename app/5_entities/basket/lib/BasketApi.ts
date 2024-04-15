import { Api } from "@/app/6_shared/api/Api";
import { BasketType, ChangeOrderedProductCountResponseType } from "./types";

export class BasketApi extends Api {
    static currentUrl: string = `${this.baseUrl}/basket`;

    static getBasket = async (jwt: string) => {
        const res = await fetch(`${this.currentUrl}`, {
            method: 'GET',
            next: {
                tags: [this.TAGS.basket]
            },
            headers: {
                'authorization': 'Bearer ' + jwt
            }
        })

        return await this.handleResponse<BasketType>(res);
    }

    static addProductToBasket = async (jwt: string, productId: string) => {
        const res = await fetch(`${this.currentUrl}/product/${productId}`, {
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + jwt
            }
        })

        return await this.handleResponse<BasketType>(res);
    }

    static removeProductFromBasket = async (jwt: string, orderProductId: string) => {
        const res = await fetch(`${this.currentUrl}/orderProduct/${orderProductId}`, {
            method: 'DELETE',
            headers: {
                'authorization': 'Bearer ' + jwt
            }
        })

        return await this.handleResponse<{ message: string }>(res);
    }

    static changeOrderedProductCount = async (jwt: string, orderProductId: string, newCount: number) => {
        const res = await fetch(`${this.currentUrl}/orderProduct/${orderProductId}`, {
            method: 'PUT',
            body: JSON.stringify({
                count: newCount
            }),
            headers: {
                ...this.headers,
                'authorization': 'Bearer ' + jwt
            }
        })

        return await this.handleResponse<ChangeOrderedProductCountResponseType>(res);
    }
}