
export { default } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"

// Match all routes except /login and /signup
export const config = { matcher: ["/((?!login|signup|api).*)"]}