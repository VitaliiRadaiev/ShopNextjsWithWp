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
}