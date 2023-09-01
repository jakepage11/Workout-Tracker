import "./globals.css"
import { AuthContextProvider } from "@/stores/AuthContext"

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        {/* <AuthContextProvider> */}
            {children}
          <div id="portal-root"></div>
        {/* </AuthContextProvider> */}
      </body>
    </html>
  )
}
