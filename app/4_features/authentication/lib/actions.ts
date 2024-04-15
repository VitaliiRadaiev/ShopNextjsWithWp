// 'use server';

// import { revalidateTag } from "next/cache";
// import { UsersApi } from "@/app/5_entities/users/lib/UsersApi";
// import { cookies } from "next/headers";
// import { z } from 'zod';
// import { Api } from "@/app/6_shared/api/Api";
// import { LoginQueryDataType, RegisterQueryDataType } from "@/app/5_entities/users";
// import { getJwtFromCookies } from "@/app/6_shared/utils/getJwtFromCookies";
// import { ApiError } from "next/dist/server/api-utils";
// import { RedirectType, redirect } from "next/navigation";

// export async function setAuthCookyAction(
//     {
//         isIdentified,
//         jwtToken
//     }: { isIdentified: boolean, jwtToken: string }
// ) {
//     cookies().set('user-jwt', jwtToken);
//     cookies().set('is-user-identified', isIdentified ? '1': '0');
// }

// export async function removeAuthCookyAction() {
//     cookies().delete('user-jwt');
//     cookies().delete('is-user-identified');
// }

// export async function createUnidentifiedUserAction() {
//     return await UsersApi.createUnidentifiedUser();
// }

// export async function loginAction(loginData: LoginQueryDataType) {
//     return UsersApi.login(loginData);
// }

// export async function registerAction(registerData: RegisterQueryDataType) {
//     try {
//         const jwt = await getJwtFromCookies();
//         if(!jwt) return;
        
//         const result = await UsersApi.register(jwt, registerData);

//         if(result?.resultCode === 1) {
//             return result
//         }

//         if(result?.resultCode === 0) {
//             cookies().set('is-user-identified', '1');
//             redirect('/cabinet', RedirectType.push);
//         }

//     } catch (error) {
//         if(error instanceof ApiError) {
//             console.log(error);
//         }
//         throw error
//     }
// }
