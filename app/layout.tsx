import "./globals.css"
import Providers from "./GlobalRedux/providers"
import { store } from "./GlobalRedux/store"
import AuthProvider from "@/context/AuthContext"
import { getServerSession } from "next-auth"
import { options } from "./api/auth/[...nextauth]/options"
import { Provider } from "react-redux"

export default async function RootLayout({children}: {children: React.ReactNode}) {
 const session = await getServerSession(options)
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {/* <Provider store={store}> */}
            {children}
            <div id='portal-root'></div>
          {/* </Provider> */}
        </AuthProvider>
      </body>
    </html>
  )
}
