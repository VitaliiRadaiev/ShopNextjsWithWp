'use server';

import { CommentsApi } from "@/app/5_entities/products/comments";
import { Api } from "@/app/6_shared/api/Api";
import { fetchApi } from "@/app/6_shared/api/graphqlApi";
import { getJwtFromCookies } from "@/app/6_shared/utils/getJwtFromCookies";
import { revalidateTag } from "next/cache";

interface CreateCommentQueryData {
    author: string; 
    productDatabaseId: number;
    text: string;  
    rating: number;
}

export async function createCommentAction(sessionToken: string, queryData: CreateCommentQueryData) {
    const { data } = await fetchApi({
        sessionToken,
        query: `
            mutation createComment(
                $author: String!, 
                $commentOn: Int!, 
                $content: String!, 
                $rating: Int!
            ) {
                writeReview(
                    input: {
                        rating: $rating, 
                        commentOn: $commentOn, 
                        content: $content, 
                        author: $author
                    }
                ) {
                    rating
                }
            }
        `,
        variables: {
            author: queryData.author, 
            commentOn: queryData.productDatabaseId, 
            content: queryData.text!, 
            rating: queryData.rating
        }
    })

    const targetErrors = ['Обнаружен дубликат комментария. Кажется, вы уже сказали это!', 'Вы комментируете слишком быстро. Попридержите коней.'];
    
    if(data.errors) {
        const errors = data.errors as { message: string; }[]
        const isTargetError = errors.some(error => targetErrors.includes(error.message));

        if(isTargetError) {
            return {
                data: {
                    writeReview: null,
                    isTargetError: true,
                    errorMessage: errors.map(error => error.message).join(' ,')
                },
                errors: undefined
            } as {
                data: {
                    writeReview: null;
                    isTargetError: boolean;
                    errorMessage?: string;
                };
                errors?: {
                    message: string;
                }[]
            }
        }
    }

    return {
        data: {
            writeReview: data.data.writeReview,
            isTargetError: false
        },
        errors: data.errors 
    } as {
        data: {
            writeReview: null | {
                status: string;
            };
            isTargetError: boolean;
            errorMessage?: string;
        }
        errors?: {
            message: string;
        }[]
    }
}