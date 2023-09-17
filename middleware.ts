export { default } from "next-auth/middleware"
import { NextRequest, NextResponse } from "next/server"

// Match all routes except /loginf
export const config = { matcher: ["/((?!login|\\.netlify|signup).*)"]}