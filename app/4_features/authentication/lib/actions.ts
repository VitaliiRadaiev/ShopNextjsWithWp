'use client';

import { CustomerType } from "@/app/5_entities/users";
import { FragmentCustomerFields } from "@/app/6_shared/api/fragments";
import { fetchApi } from "@/app/6_shared/api/graphqlApi";

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

interface LoginData {
    username: string;
    password: string;
}

export async function loginAction(loginData: LoginData): Promise<{
    customer: CustomerType | null,
    errors?: { message: string }[]
}> {
    const { data } = await fetchApi({
        query: `
            mutation login($password: String!, $username: String!) {
                login(input: {password: $password, username: $username}) {
                    customer {
                        ${FragmentCustomerFields}
                    }
                }
            }
        `,
        variables: {
            password: loginData.password,
            username: loginData.username
        },
    })

    const targetErrors = [
        'invalid_username',
        'incorrect_password'
    ]
    let isTargetError = false;
    if(data.errors) {
        const errors: { message: string }[] = data.errors;
        isTargetError = errors.some(error => targetErrors.includes(error.message));

        if(isTargetError) {
            return {
                customer: data.data.login?.customer || null,
                errors: data.errors
            }
        } else {
            throw new Error('[Graphql loginAction error] '+errors.map(error => error.message));
        }

    } else {
        return {
            customer: data.data.login?.customer || null,
            errors: data.errors
        }
    }
}


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


interface RegisterUserData {
    username: string;
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    phone: string
}

export async function registerCustomerAction(registerData: RegisterUserData) {

    const { data } = await fetchApi({
        query: `
            mutation registerUser(
                $email: String!, 
                $firstName: String!, 
                $lastName: String!, 
                $password: String!, 
                $username: String!, 
                $phone: String!
            ) {
                registerCustomer(
                    input: {
                        email: $email,
                        password: $password, 
                        username: $username,
                        lastName: $lastName, 
                        firstName: $firstName, 
                        shipping: {
                            phone: $phone, 
                            lastName: $lastName, 
                            firstName: $firstName,
                        },
                        billing: {
                            phone: $phone, 
                            lastName: $lastName, 
                            firstName: $firstName,
                            email: $email,
                        }
                    }
                ) {
                    customer {
                        databaseId
                    }
                }
            }
        `,
        variables: {
            email: registerData.email,
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            password: registerData.password,
            username: registerData.username,
            phone: registerData.phone,
        },
    })

    interface Response {
        customer: {
            databaseId: number;
        } | null;
        errors?: {
            message: string;
        }[]
    }

    return {
        customer: data.data.registerCustomer?.customer || null,
        errors: data.errors
    } as Response;
}
