// 'use server';

// import { UsersApi } from "@/app/5_entities/users";
// import { WishlistApi } from "@/app/5_entities/wishlist";
// import { Api } from "@/app/6_shared/api/Api";
// import { getJwtFromCookies } from "@/app/6_shared/utils/getJwtFromCookies";
// import { revalidateTag } from "next/cache";
// import { redirect } from "next/navigation";

// export async function addProductToWishlistAction(productId: string) {
//     const jwt = await getJwtFromCookies();
//     if(!jwt) return;
    
//     const me = await UsersApi.getMe(jwt);
//     if(!me.isIdentified) {
//         redirect('/authorization');
//     }

//     await WishlistApi.addProduct(jwt, productId);
//     revalidateTag(Api.TAGS.wishlist);
// }
// export async function removeProductFromWishlistAction(productId: string) {
//     const jwt = await getJwtFromCookies();
//     if(!jwt) return;
    
//     const me = await UsersApi.getMe(jwt);
//     if(!me.isIdentified) {
//         redirect('/authorization');
//     }

//     await WishlistApi.removeProduct(jwt, productId);
//     revalidateTag(Api.TAGS.wishlist);
// }