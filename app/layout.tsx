import "./globals.css"
import Providers from "./GlobalRedux/providers"
import AuthProvider from "@/context/AuthContext"

export default function RootLayout({children}: {children: React.ReactNode}) {
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
