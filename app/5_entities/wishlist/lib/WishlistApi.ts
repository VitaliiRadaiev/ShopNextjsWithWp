import { Api } from "@/app/6_shared/api/Api";
import { WishlistType } from "./types";
import { IDefaultResponse } from "@/app/6_shared/types/types";
import { ApiError } from "@/app/6_shared/api/ApiError";

export class WishlistApi extends Api {
    static currentUrl: string = `${this.baseUrl}/wishlist`;

    static getWishlist = async (jwt: string) => {
        const res = await fetch(`${this.currentUrl}`, {
            method: 'GET',
            headers: {
                'authorization': 'Bearer ' + jwt
            },
            next: {
                tags: [this.TAGS.wishlist]
            }
        })

        const value: IDefaultResponse<WishlistType> = await res.json(); 
        if(value.resultCode === 0 && value?.data) {
            return value.data;
        } else {
            if(res.status === 404) return;
            throw new ApiError(`[code: ${res.status}], ${value?.message}`);
        }
    }

    static addProduct = async (jwt: string, productCardId: string) => {
        const res = await fetch(`${this.currentUrl}/product/${productCardId}`, {
            method: 'PUT',
            headers: {
                'authorization': 'Bearer ' + jwt
            }
        })

        return await this.handleResponse<WishlistType>(res);
    }

    static removeProduct = async (jwt: string, productCardId: string) => {
        const res = await fetch(`${this.currentUrl}/product/${productCardId}`, {
            method: 'DELETE',
            headers: {
                'authorization': 'Bearer ' + jwt
            }
        })

        return await this.handleResponse<WishlistType>(res);
    }
}