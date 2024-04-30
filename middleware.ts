import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './public/i18nConfig';
 

export default async function myMiddleware(request: NextRequest) {
    // if (request.nextUrl.pathname.startsWith('/cabinet')) {
    //     const isUserIdentified = Boolean(Number(request.cookies.get('is-user-identified')?.value));
    //     if(!isUserIdentified) {
    //         return NextResponse.redirect(new URL('/authorization', request.url))
    //     }
    // }

    return i18nRouter(request, i18nConfig);
}

export const config = {
    matcher: ['/((?!api|static|.*\\..*|_next).*)', '/cabinet/:path*'],
}