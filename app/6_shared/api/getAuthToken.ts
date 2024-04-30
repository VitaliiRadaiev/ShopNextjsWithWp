import { fetchApi } from "./graphqlApi";

function hasCredentials() {
    const authToken = sessionStorage.getItem(process.env.NEXT_PUBLIC_AUTH_TOKEN_SS_KEY!);
    const refreshToken = localStorage.getItem(process.env.NEXT_PUBLIC_REFRESH_TOKEN_LS_KEY!);

    if (!!authToken && !!refreshToken) {
        return true;
    }

    return false;
}

let tokenSetter: string | number | NodeJS.Timeout | undefined;
async function fetchAuthToken() {
    const refreshToken = localStorage.getItem(process.env.NEXT_PUBLIC_REFRESH_TOKEN_LS_KEY!);
    if (!refreshToken) {
        // No refresh token means the user is not authenticated.
        return;
    }

    try {
        const { data } = await fetchApi({
            query: `
                mutation RefreshAuthToken($refreshToken: String!) {
                    refreshJwtAuthToken(input: { jwtRefreshToken: $refreshToken }) {
                        authToken
                    }
                }
            `,
            variables: {
                refreshToken
            }
        }); 

        const authToken = data.data?.refreshJwtAuthToken?.authToken;
        if (!authToken) {
            throw new Error('Failed to retrieve a new auth token');
        }

        // Save token.
        sessionStorage.setItem(process.env.NEXT_PUBLIC_AUTH_TOKEN_SS_KEY!, authToken);
        if (tokenSetter) {
            clearInterval(tokenSetter);
        }
        tokenSetter = setInterval(
            async () => {
                if (!hasCredentials()) {
                    clearInterval(tokenSetter);
                    return;
                }
                fetchAuthToken();
            },
            Number(process.env.AUTH_KEY_TIMEOUT || 30000),
        );

        return authToken;
    } catch (err) {
        console.error(err);
    }

}


export async function getAuthToken() {
    let authToken = sessionStorage.getItem(process.env.NEXT_PUBLIC_AUTH_TOKEN_SS_KEY!);
    if (!authToken || !tokenSetter) {
        authToken = await fetchAuthToken();
    }
    return authToken;
}