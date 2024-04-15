export type WishlistType = {
    id: string;
    userId: string;
    products: ProductCardType[]
}

type ProductCardType = {
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