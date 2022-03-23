import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "swiper/css/bundle";

import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../redux/app/store'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>
  )

}

export default MyApp
