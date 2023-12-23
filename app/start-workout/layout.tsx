import "../globals.css"
import Layout from "../../components/layout/Layout"

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <div>
      <Layout>
        {children}
      </Layout>
      <div id="portal-root"></div>
    </div>
  )
}