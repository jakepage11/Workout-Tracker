import "./globals.css"
import { AuthContextProvider } from "@/stores/AuthContext"

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        {/* <AuthContextProvider> */}
          {/* <Layout> */}
            {children}
          {/* </Layout> */}
          <div id="portal-root"></div>
        {/* </AuthContextProvider> */}
      </body>
    </html>
  )
}
