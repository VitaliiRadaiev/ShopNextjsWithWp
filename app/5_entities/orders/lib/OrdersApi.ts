import { Api } from "@/app/6_shared/api/Api";
import { CreateOrderQueryDataType, HistoryType, OrderType } from "./types";

export class OrdersApi extends Api {
    static currentUrl: string = `${this.baseUrl}/history`;

    static getHistory = async (jwt: string) => {
        const res = await fetch(`${this.currentUrl}`, {
            method: 'GET',
            headers: {
                'authorization': 'Bearer ' + jwt
            }
        })

        return await this.handleResponse<HistoryType>(res);
    }

    static getOrderById = async (orderId: number) => {
        const res = await fetch(`${this.currentUrl}/order/${orderId}`, {
            method: 'GET'
        })

        return await this.handleResponse<OrderType>(res);
    }
    
    static createOrder = async (jwt: string, data: CreateOrderQueryDataType ) => {
        const res = await fetch(`${this.currentUrl}/order`, {
            method: 'POST',
            headers: {
                ...this.headers,
                'authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify(data)
        })

        return await this.handleResponse<OrderType>(res);
    }
}