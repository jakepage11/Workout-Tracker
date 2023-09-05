export { default } from "next-auth/middleware"

// Match all routes except /login
export const config = { matcher: ["/((?!login|\\.netlify/.*).*)"]}