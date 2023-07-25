import '@/styles/globals.css'
import Layout from '@/components/layout/Layout'
import { AuthContextProvider } from '@/stores/authContext'

export default function App({ Component, pageProps }) {
  return <AuthContextProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </AuthContextProvider>
 
}
