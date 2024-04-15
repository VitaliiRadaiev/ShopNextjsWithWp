import { ProductCardType } from "@/app/6_shared/types/types";

export type BasketType = {
    id: string;
    userId: string;
    totalPrice: number;
    products: OrderedProductType[];
}

export type OrderedProductType = {
    id: string;
    product: ProductType;
    count: number;
    basketId: string | null;
    orderId: number | null;
}

export type ProductType = {
    id: string;
    title: string;
    price: number;
    oldPrice: number;
    isNew: boolean;
    inStock: boolean;
    isPromotion: boolean;
    isBestseller: boolean;
    isRecommended: boolean;
    shortDescription: string;
    description: string;
    createdAt: Date;
    rating: number;
    categoryId: string;
    images: ProductImageType[];
}

type ProductImageType = {
    id: string;
    url: string;
    isMain: boolean;
    productCardId: string;
}

export type ChangeOrderedProductCountResponseType = {
    id: string;
    productCardId: string;
    count: number;
    basketId: string | null;
    orderId: number | null;
}

export type CartType = {
    subtotal: string;
    total: string;
    contents: {
        itemCount: number;
        productCount: number;
        nodes: OrderItemType[]
    }
}

export type OrderItemType = {
    key: string;
    quantity: number;
    subtotal: string;
    product: {
        node: ProductCardType;
    };
}