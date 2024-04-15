'use server';

import { SearchMainApi } from "../api/SearchMainApi";

export async function getSearchedProductsAction(searchQuery: string) {
    if(!searchQuery.trim().length) return;
    return await SearchMainApi.getSearchedProducts({
        term: searchQuery,
    });
}