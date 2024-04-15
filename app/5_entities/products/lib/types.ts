import { ProductTagType, StockStatusVariantsType } from "@/app/6_shared/types/types";
import { CommentType } from "../comments";
import { ReviewType } from "../comments/lib/types";

type ProductFeatureType = {
    id: string;
    title: string;
    value: string;
    productCardId: string;
}

export type SortByType = 'cheap' | 'expensive' | 'rank';

export type GetProductsRequestDataType = {
    filters?: FilterType[]; 
    priceRange?: { from: number, to: number };
    sortBy?: SortByType;
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

export type GetProductsResponseType = {
    count: number;
    lowestPrice: number;
    highestPrice: number;
}

export type ProductSingleType = {
    id: string;
    databaseId: number;
    averageRating: string;
    description: string;
    title: string;
    stockStatus: StockStatusVariantsType;
    regularPrice: string;
    salePrice: string | null;
    commentCount: number | null;
    productTags: {
        nodes: ProductTagType[]
    };
    galleryImages: {
        nodes: { sourceUrl: string }[]
    };
    attributes: {
        nodes: AttributeType[]
    },
    reviewCount: number;
    reviews: {
        edges: {
            rating: 0;
            node: ReviewType
        }[]
    }
}

// == WordPress
export type ProductTagVariantsType = 'promotion' | 'novelty' | 'best-seller' | 'recommended';

export type FetchProductsQueriesType = {
    count?: number;
    categorySlug?: string;
    tags?: string[];
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    endCursor?: string;
    filters?: {taxonomy: string, terms: string[]}[];
    sortBy?: SortByType;
}

type AttributeType = {
    id: string;
    label: string;
    name: string;
    terms?: {
        nodes: AttributeValueType[];
    };
    options: string[];
}

type AttributeValueType = {
    name: string;
    slug: string;
    id: string;
}