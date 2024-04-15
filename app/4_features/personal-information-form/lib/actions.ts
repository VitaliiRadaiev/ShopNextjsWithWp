// 'use server';

// import { UsersApi } from "@/app/5_entities/users";
// import { Api } from "@/app/6_shared/api/Api";
// import { getJwtFromCookies } from "@/app/6_shared/utils/getJwtFromCookies";
// import { revalidateTag } from "next/cache";

// export async function updateMeAction(data: { firstName: string, lastName: string, phone: string}) {
//     const jwt = await getJwtFromCookies();
//     if(!jwt) return;

//     await UsersApi.updateMe(jwt, data);
//     revalidateTag(Api.TAGS.me);
// }