// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

    const cookie =  request.cookies.has('next-auth.session-token')
//   console.log(cookie) 

  if(!cookie) {
    const redirectUrl = request.nextUrl.clone()

        redirectUrl.pathname = '/signin'
        redirectUrl.searchParams.set(`redirectFrom`, request.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
  }

 
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher:[ '/feed','/','/profile' ],
}