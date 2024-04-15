import { IDefaultResponse } from "../types/types";
import { ApiError } from "./ApiError";

export abstract class Api {
    static baseUrl: string = process.env.NEXT_PUBLIC_HOST as string;
    static headers: Record<string, string> = {
        'Content-Type': 'application/json;charset=utf-8'
    }
    static TAGS = {
        categories: 'Categories',
        products: 'Products',
        product: 'Product',
        searchedProducts: 'SearchedProducts',
        basket: 'Basket',
        me: 'Me',
        wishlist: 'Wishlist',
    }

    static handleResponse = async <T>(res: Response): Promise<T> => {
        const value: IDefaultResponse<T> = await res.json(); 
        if(value.resultCode === 0 && value?.data) {
            return value.data;
        } else {
            throw new ApiError(`[code: ${res.status}], ${value?.message}`);
        }
    }
}