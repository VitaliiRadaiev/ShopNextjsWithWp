import { GetProductsResponseType } from "@/app/5_entities/products";
import { Api } from "@/app/6_shared/api/Api";

export class SearchMainApi extends Api {
    static currentUrl: string = `${this.baseUrl}/products`;

    static getSearchedProducts = async (requestData: { term: string }) => {
        const res = await fetch(`${this.currentUrl}/get`, {
            method: 'POST',
            body: JSON.stringify({
                page: 1,
                count: 5,
                ...requestData,
            }),
            next: {
                tags: [this.TAGS.searchedProducts]
            },
            headers: this.headers
        })

        return await this.handleResponse<GetProductsResponseType>(res);
    }
}