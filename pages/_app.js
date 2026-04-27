import { useRouter } from 'next/router';
import Layout from '../Components/Layout';
import { Provider } from '../Components/Context';
import '../scss/globals.scss';
import { Analytics } from '@vercel/analytics/next';
import { Montserrat, Plus_Jakarta_Sans } from 'next/font/google';
import classNames from 'classnames';

const montserrat = Montserrat({
  weight: '900',
  subsets: ['latin'],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <div className={classNames('site-wrapper', montserrat, plusJakartaSans)}>
      <Provider>
        <Layout>
          <Component key={router.asPath} {...pageProps} />
        </Layout>
        <Analytics />
      </Provider>
    </div>
  );
}
