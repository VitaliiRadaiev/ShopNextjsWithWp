// 'use server';

// import { getJwtFromCookies } from "@/app/6_shared/utils/getJwtFromCookies";
// import { LastVIewedProductsApi } from "./LastViewedProductsApi";

// export async function saveProductAsLastViewedAction(productId: string) {
//     const jwt = await getJwtFromCookies();
//     if(!jwt) return;

//     await LastVIewedProductsApi.addProduct(jwt, productId);
// }

// export async function unSaveProductAsLastViewedAction(productId: string) {
//     const jwt = await getJwtFromCookies();
//     if(!jwt) return;

//     await LastVIewedProductsApi.removeProduct(jwt, productId);
// }