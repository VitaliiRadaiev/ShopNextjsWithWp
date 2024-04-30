import { Api } from "@/app/6_shared/api/Api";
import { CategoryType } from "..";

export class CategoriesApi extends Api {
    static currentUrl: string = `${this.baseUrl}/categories`;

    static getCategories = async () => {
        const res = await fetch(`${this.currentUrl}`, {
            next: {
                tags: [this.TAGS.categories],
            },
            headers: this.headers
        })
        return await this.handleResponse<CategoryType[]>(res);
    }

    static getCategoryById = async (categoryId: string) => {
        const res = await fetch(`${this.currentUrl}/${categoryId}`, {
            headers: this.headers
        })
        return await this.handleResponse<CategoryType>(res);
    }

    static getCategoryAttributes = async (categoryId: number, slug: string) => {
        const params = new URLSearchParams();
        
        //params.set('_fields', 'id,slug,name,stock_status,average_rating,regular_price,sale_price,price,images,tags');
        params.set('category', String(categoryId));
        params.set('slug', slug);
        const res = await fetch(`${this.baseUrl}/products?${params.toString()}`)

        if(res.ok) {
            const data = await res.json();
            return data[0];
        } else {
            throw new Error('Error in getCategoryAttributes(), status:' + res.status);
        }
    }
}