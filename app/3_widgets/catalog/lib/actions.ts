'use server';

import { FetchProductsQueriesType, fetchProducts } from "@/app/5_entities/products";

export async function getProductsAction(requestOptions: FetchProductsQueriesType) {
    return fetchProducts(requestOptions);
}