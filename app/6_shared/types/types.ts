export interface IDefaultResponse<T> {
    resultCode: number;
    data?: T;
    message?: string;
}

export type ProductCardType = {
    id: string;
    databaseId: number;
    slug: string;
    title: string;
    stockStatus: StockStatusVariantsType;
    regularPrice: string;
    salePrice: string | null;
    averageRating: number;
    featuredImage: ProductImageType | null;
    productTags: {
        nodes: ProductTagType[]
    }
}

export type ProductCardFromRestType = {
    id: number;
    slug: string;
    name: string;
    stock_status: StockStatusVariantsRestType;
    average_rating: string;
    regular_price: string;
    sale_price: string;
    price: string;
    images: { id: number, src: string }[];
    tags: { id:number, name: string, slug: string }[]
}

export type StockStatusVariantsType = 'IN_STOCK' | 'OUT_OF_STOCK';
export type StockStatusVariantsRestType = 'instock' | 'outofstock' | 'onbackorder';


type ProductImageType = {
    node: {
        sourceUrl: string
    }
}

export type ProductTagType = {
    id: string;
    name: string;
    slug: string;
}