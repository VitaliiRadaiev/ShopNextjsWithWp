import { ProductCardType } from "@/app/6_shared/types/types";

export type HistoryType = {
    id: string;
    userId: string;
    orders: OrderType[];
}

export type OrderStatuses = 'CANCELLED' | 'CHECKOUT_DRAFT' | 'COMPLETED' | 'FAILED' | 'ON_HOLD' | 'PENDING' | 'PROCESSING' | 'REFUNDED'; 

export type OrderType = {
    databaseId: number;
    orderNumber: number;
    billing: {
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
    };
    date: string;
    paymentMethod: string;
    paymentMethodTitle: string;
    status: OrderStatuses;
    total: string;
    shipping: {
        address1: string;
    };
    lineItems: {
        nodes: {
            product: {
                node: ProductCardType
            }
            quantity: number;
            total: string;
        }[]
    }
}

type OrderProductType = {
    id: string;
    count: number;
}


export type CreateOrderQueryDataType = {
    delivery: string;
    deliveryFullAddress: string;
    paymentMethod: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

