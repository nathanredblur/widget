import type { AppProps } from 'next/app'
import '../src/utils/styles.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp