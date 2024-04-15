import { Api } from "@/app/6_shared/api/Api";
import { CreateUnidentifiedUserResponseType, LoginQueryDataType, RegisterQueryDataType, RegisterResponseDataType, UserType } from "./types";
import { IDefaultResponse } from "@/app/6_shared/types/types";
import { ApiError } from "@/app/6_shared/api/ApiError";

export class UsersApi extends Api {
    static currentUrl: string = `${this.baseUrl}/users`;

    static createUnidentifiedUser = async () => {
        const res = await fetch(`${this.currentUrl}/createUnidentifiedUser`, {
            method: 'POST',
            cache: 'no-cache',
            headers: this.headers
        })

        const value: IDefaultResponse<CreateUnidentifiedUserResponseType> = await res.json();

        if (value.resultCode === 0 && value?.data) {
            const jwtToken = res.headers.get('X-JWT');
            if (!jwtToken) throw new ApiError(`[code: ${res.status}], invalid jwt-token`);

            return {
                jwtToken,
                user: value.data
            };
        } else {
            throw new ApiError(`[code: ${res.status}], ${value?.message}`);
        }
    }

    static getMe = async (jwt: string) => {
        const res = await fetch(`${this.currentUrl}/me`, {
            method: 'GET',
            headers: {
                'authorization': 'Bearer ' + jwt
            },
            next: { tags: [this.TAGS.me] }
        })
        return this.handleResponse<UserType>(res);
    }

    static updateMe = async(jwt: string, data: { firstName: string, lastName: string, phone: string}) => {
        const res = await fetch(`${this.currentUrl}/me`, {
            method: 'PUT',
            headers: {
                ...this.headers,
                'authorization': 'Bearer ' + jwt
            },
            body: JSON.stringify(data)
        })
        return this.handleResponse<UserType>(res);
    }

    static login = async (loginData: LoginQueryDataType) => {
        const res = await fetch(`${this.currentUrl}/login`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(loginData)
        })

        const value: IDefaultResponse<null> = await res.json();
        if (value.resultCode === 0) {
            const jwtToken = res.headers.get('X-JWT');
            if (!jwtToken) throw new ApiError(`[code: ${res.status}], invalid jwt-token`);
            return jwtToken;
        } else {
            if (res.status === 500) {
                throw new ApiError(`[code: ${res.status}], ${value?.message}`);
            } else {
                return false;
            }
        }
    }

    static register = async (jwt: string, registerData: RegisterQueryDataType) => {
        const res = await fetch(`${this.currentUrl}/register`, {
            method: 'POST',
            body: JSON.stringify(registerData),
            headers: {
                ...this.headers,
                'authorization': 'Bearer ' + jwt,
            }
        });

        const value = await res.json();
        
        if (value.resultCode === 0) {
            return value as IDefaultResponse<RegisterResponseDataType>;
        } else {
            if(res.status === 409) {
                return value as { resultCode: number, message: string };
            }
            if (res.status === 500) {
                throw new ApiError(`[code: ${res.status}], ${value?.message}`);
            } 
        }
    }
}