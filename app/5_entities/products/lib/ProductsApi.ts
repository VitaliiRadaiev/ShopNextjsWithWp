import { Api } from "@/app/6_shared/api/Api";
import { GetProductsRequestDataType, GetProductsResponseType, ProductSingleType, SortByType } from "./types";
import { ProductCardFromRestType } from "@/app/6_shared/types/types";


export interface FetchProductsRestQueriesType {
    count?: number;
    categoryId?: number;
    tags?: string[];
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    filters?: {taxonomy: string, terms: string[]}[];
    sortBy?: SortByType;
    page?: string;
}

export class ProductsApi extends Api {
    static currentUrl: string = `${this.baseUrl}/products`;

    static getProducts = async (requestData: FetchProductsRestQueriesType) => {
        const params = new URLSearchParams();
        requestData.count && params.set('per_page', String(requestData.count));
        requestData.categoryId && params.set('category', String(requestData.categoryId));
        requestData.inStock && params.set('stock_status', 'instock');
        requestData.tags && params.set('tag', requestData.tags.join(','));
        requestData.filters && requestData.filters.forEach(filter => {
            params.set('attribute', filter.taxonomy);
            params.set('attribute_term', filter.terms.join(','));
        })
        requestData.maxPrice && params.set('max_price', String(requestData.maxPrice));
        requestData.minPrice && params.set('min_price', String(requestData.minPrice));
        requestData.page && params.set('page', requestData.page);
        if(requestData.sortBy === 'rank') {
            params.set('orderby', 'rating');
        }
        
        if(requestData.sortBy === 'cheap') {
            params.set('orderby', 'price');
            params.set('order', 'asc');
        }

        if(requestData.sortBy === 'expensive') {
            params.set('orderby', 'price');
            params.set('order', 'desc');
        }


        const res = await fetch(`${this.currentUrl}?${params.toString()}`, {
            method: 'GET',
            next: {
                tags: [this.TAGS.products]
            },
            headers: this.headers,
            
        })
        const data = await res.json();
        const total = res.headers.get('X-Wp-Total') || '0';
        const totalPages = res.headers.get('X-Wp-Totalpages') || '0';

        return {
            products: data,
            total,
            totalPages
        } as {
            products: ProductCardFromRestType[];
            total: string;
            totalPages: string;
        };
    }

    static getProductById = async (productId: string) => {
        const res = await fetch(`${this.currentUrl}/product/${productId}`, {
            method: 'GET',
            headers: this.headers,
            next: {
                tags: [this.TAGS.product]
            },
        })

        return await this.handleResponse<ProductSingleType>(res);
    }
}