'use server';

import { CommentsApi } from "@/app/5_entities/products/comments";
import { UsersApi } from "@/app/5_entities/users";
import { Api } from "@/app/6_shared/api/Api";
import { getJwtFromCookies } from "@/app/6_shared/utils/getJwtFromCookies";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function updateCommentAction(commentId: string, text:string) {
    const jwt = await getJwtFromCookies();
    if(!jwt) return;

    await CommentsApi.updateComment(jwt, commentId, text);
    revalidateTag(Api.TAGS.product);
}

export async function deleteCommentAction(commentId: string) {
    const jwt = await getJwtFromCookies();
    if(!jwt) return;

    await CommentsApi.deleteComment(jwt, commentId);
    revalidateTag(Api.TAGS.product);
}

export async function likeAction(commentId: string) {
    const jwt = await getJwtFromCookies();
    if(!jwt) return;

    const me = await UsersApi.getMe(jwt);
    if(!me.isIdentified) {
        redirect('/authorization');
    }

    await CommentsApi.addLike(jwt, commentId);
    revalidateTag(Api.TAGS.product);
}

export async function dislikeAction(commentId: string) {
    const jwt = await getJwtFromCookies();
    if(!jwt) return;

    const me = await UsersApi.getMe(jwt);
    if(!me.isIdentified) {
        redirect('/authorization');
    }

    await CommentsApi.addDislike(jwt, commentId);
    revalidateTag(Api.TAGS.product);
}