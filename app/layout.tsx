import "../styles/globals.css"
import Layout from "../components/layout/Layout"
import { AuthContextProvider } from "@/stores/authContext"

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <Layout>
            {children}
          </Layout>
          <div id="portal-root"></div>
        </AuthContextProvider>
      </body>
    </html>
  )
}