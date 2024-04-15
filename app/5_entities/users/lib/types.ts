export type CreateUnidentifiedUserResponseType = {
    id: string;
    isIdentified: boolean;
    email: null;
    firstName: null;
    lastName: null;
    phone: null;
}

export type UserType = {
    id: string;
    isIdentified: boolean;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
}

export type LoginQueryDataType = {
    email: string;
    password: string;
}
export type RegisterQueryDataType = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
}

export type RegisterResponseDataType = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
}