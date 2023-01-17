import '../styles/globals.css'
import '../styles/Product.scss'
import '../styles/Filters.scss'
import Layout from "../components/Layout"
import { store } from "../store"
import { Provider } from "react-redux"

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}
