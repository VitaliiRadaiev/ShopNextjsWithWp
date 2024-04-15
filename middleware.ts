import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export default async function myMiddleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/cabinet')) {
        const isUserIdentified = Boolean(Number(request.cookies.get('is-user-identified')?.value));
        if(!isUserIdentified) {
            return NextResponse.redirect(new URL('/authorization', request.url))
        }
    }
}

export const config = {
    matcher: ['/cabinet/:path*'],
}