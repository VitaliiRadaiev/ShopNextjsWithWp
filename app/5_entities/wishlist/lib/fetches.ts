'use server';

import { getJwtFromCookies } from "@/app/6_shared/utils/getJwtFromCookies";
import { WishlistApi } from "./WishlistApi";

export async function fetchWishlist() {
    const jwt = await getJwtFromCookies();
    if(!jwt) return;
    return WishlistApi.getWishlist(jwt);
}