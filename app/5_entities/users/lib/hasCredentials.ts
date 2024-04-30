'use client';

export function hasCredentials() {
    const authToken = sessionStorage.getItem(process.env.NEXT_PUBLIC_AUTH_TOKEN_SS_KEY!);
    const refreshToken = localStorage.getItem(process.env.NEXT_PUBLIC_REFRESH_TOKEN_LS_KEY!);

    if (!!authToken && !!refreshToken) {
        return true;
    }

    return false;
}