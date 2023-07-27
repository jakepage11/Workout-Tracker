import Layout from "../components/layout/Layout"
import { AuthContextProvider } from "@/stores/authContext"
export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <Layout>
            {children}
          </Layout>
        </AuthContextProvider>
          <Layout />
      </body>
    </html>
  )
}