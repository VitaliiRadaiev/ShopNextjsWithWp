export type getProductsDataType = {
    filters?: FilterType[]; 
    priceRange?: { from: number, to: number };
    sortBy?: 'cheap' | 'expensive' | 'rank';
    isNew?: boolean;
    inStock?: boolean;
    isPromotion?: boolean;
    isBestseller?: boolean;
    isRecommended?: boolean;
    count?: number;
    page?: number;
    term?: string;
    categoryId?: string;
}

type FilterType = {
    id: string;
    items: string[]
}