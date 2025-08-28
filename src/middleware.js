import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose' 

const secret = new TextEncoder().encode(process.env.JWT_KEY) //MUST USE IN jose
/* 
NOTE: 
- no cookies() from next/header works only simple request.cookies.get()
- no jwt works as it dont let you use encrupt packages header
- so use jose 
- and dont forget to textEncoder your process.env.jwt_key
 */

export async function middleware(request) {
  const token = request.cookies.get('token')?.value

  let user = null

  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret)
      user = payload
      // console.log("Verified User:", user)
    } catch (err) {
      console.error("JWT verification failed:", err)
    }
  }

  const protectedPaths = ['/employee', '/leaves', '/profile', '/users','/activity', '/profile', '/users']
  const isProtected = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (isProtected && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
