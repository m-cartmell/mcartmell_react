import { useRouter } from 'next/router';
import Layout from '../Components/Layout';
import { Provider } from '../Components/Context';
import '../scss/globals.scss';
import { Analytics } from '@vercel/analytics/next';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Provider>
      <Layout>
        <Component key={router.asPath} {...pageProps} />
      </Layout>
      <Analytics />
    </Provider>
  );
}
