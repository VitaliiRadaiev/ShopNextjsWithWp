import { Api } from "@/app/6_shared/api/Api";
import { CommentType } from "..";

export class CommentsApi extends Api {
    static currentUrl: string = `${this.baseUrl}/comments`;

    static createComment = async (jwt: string, data: { text: string, stars: number, productCardId: string }) => {
        const res = await fetch(`${this.currentUrl}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                ...this.headers,
                'authorization': 'Bearer ' + jwt
            }
        })

        return await this.handleResponse<CommentType>(res);
    }

    static updateComment = async (jwt: string, commentId: string, newText: string) => {
        const res = await fetch(`${this.currentUrl}/${commentId}`, {
            method: 'PUT',
            body: JSON.stringify({
                text: newText
            }),
            headers: {
                ...this.headers,
                'authorization': 'Bearer ' + jwt
            }
        })

        return await this.handleResponse<CommentType>(res);
    }

    static deleteComment = async (jwt: string, commentId: string) => {
        const res = await fetch(`${this.currentUrl}/${commentId}`, {
            method: 'DELETE',
            headers: {
                ...this.headers,
                'authorization': 'Bearer ' + jwt
            }
        })

        return await this.handleResponse<{ message: string }>(res);
    }

    static addLike = async (jwt: string, commentId: string) => {
        const res = await fetch(`${this.currentUrl}/${commentId}/like`, {
            method: 'POST',
            headers: {
                ...this.headers,
                'authorization': 'Bearer ' + jwt
            }
        })

        return await this.handleResponse<CommentType>(res);
    }
    
    static addDislike = async (jwt: string, commentId: string) => {
        const res = await fetch(`${this.currentUrl}/${commentId}/dislike`, {
            method: 'POST',
            headers: {
                ...this.headers,
                'authorization': 'Bearer ' + jwt
            }
        })

        return await this.handleResponse<CommentType>(res);
    }
}