import { Api } from "@/app/6_shared/api/Api";
import { GetPagesResponse, Page } from "./types";



export class PagesApi extends Api {
    static currentUrl: string = 'http://test.upro.space/wp-json/wp/v2/pages';

    // static getProducts = async (requestData: FetchProductsRestQueriesType) => {
    //     const params = new URLSearchParams();

    //     params.set('_fields', 'id,slug,name,stock_status,average_rating,regular_price,sale_price,price,images,tags');

    //     requestData.count && params.set('per_page', String(requestData.count));
    //     requestData.categoryId && params.set('category', String(requestData.categoryId));
    //     requestData.inStock && params.set('stock_status', 'instock');
    //     requestData.tags && params.set('tag', requestData.tags.join(','));
    //     requestData.filters && requestData.filters.forEach(filter => {
    //         params.set('attribute', filter.taxonomy);
    //         params.set('attribute_term', filter.terms.join(','));
    //     })
    //     requestData.maxPrice && params.set('max_price', String(requestData.maxPrice));
    //     requestData.minPrice && params.set('min_price', String(requestData.minPrice));
    //     requestData.page && params.set('page', requestData.page);
    //     if(requestData.sortBy === 'rank') {
    //         params.set('orderby', 'rating');
    //     }

    //     if(requestData.sortBy === 'cheap') {
    //         params.set('orderby', 'price');
    //         params.set('order', 'asc');
    //     }

    //     if(requestData.sortBy === 'expensive') {
    //         params.set('orderby', 'price');
    //         params.set('order', 'desc');
    //     }


    //     const res = await fetch(`${this.currentUrl}?${params.toString()}`, {
    //         method: 'GET',
    //         next: {
    //             tags: [this.TAGS.products]
    //         },
    //         headers: this.headers,

    //     })
    //     const data = await res.json();
    //     const total = res.headers.get('X-Wp-Total') || '0';
    //     const totalPages = res.headers.get('X-Wp-Totalpages') || '0';

    //     return {
    //         products: data,
    //         total,
    //         totalPages
    //     } as {
    //         products: ProductCardFromRestType[];
    //         total: string;
    //         totalPages: string;
    //     };
    // }

    static getPages = async () => {
        const params = new URLSearchParams();
        params.set('acf_format', 'standard');
        params.set('_fields', 'id,slug,title');

        const res = await fetch(`${this.currentUrl}?${params.toString()}`, {
            method: 'GET',
            next: {
                revalidate: 600
            },
            headers: this.headers,
        })

        const data = await res.json();
        return data as GetPagesResponse[];
    }

    static getPage = async (slug: string): Promise<Page | undefined> => {
        const params = new URLSearchParams();
        params.set('acf_format', 'standard');
        params.set('_fields', 'acf');
        params.set('slug', slug);

        const res = await fetch(`${this.currentUrl}?${params.toString()}`, {
            method: 'GET',
            next: {
                revalidate: 600
            },
            headers: this.headers,
        })

        const data = await res.json() as Page[];
        return data[0];
    }
}