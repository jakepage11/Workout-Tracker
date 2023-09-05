import "./globals.css"
import Providers from "./GlobalRedux/providers"
import AuthProvider from "@/context/AuthContext"
import { getServerSession } from "next-auth"
import { options } from "./api/auth/[...nextauth]/options"

export default async function RootLayout({children}: {children: React.ReactNode}) {
 const session = await getServerSession(options)
 console.log({session})
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <div id='portal-root'></div>
        </AuthProvider>
      </body>
    </html>
  )
}
