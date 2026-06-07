import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Layout from '@/Components/Layout';
import { Provider } from '@/Components/Context';
import '@/scss/globals.scss';
import { Analytics } from '@vercel/analytics/next';
import { Montserrat, Plus_Jakarta_Sans } from 'next/font/google';
import classNames from 'classnames';

const headingFont = Montserrat({
  weight: '900',
  subsets: ['latin'],
  variable: '--font-heading',
});

const bodyFont = Plus_Jakarta_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-body',
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [revealKey, setRevealKey] = useState(router.asPath);

  // Reset scroll after route changes, then update revealKey for reveal measurements
  useEffect(() => {
    const handleRouteChangeComplete = (url: string) => {
      if (!url.includes('#')) {
        window.scrollTo(0, 0);
      }

      requestAnimationFrame(() => {
        setRevealKey(url);
      });
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <div
      className={classNames(
        'site-wrapper',
        headingFont.variable,
        bodyFont.variable,
      )}
    >
      <Provider>
        <Layout revealKey={revealKey}>
          <Component key={router.asPath} {...pageProps} />
        </Layout>
        <Analytics />
      </Provider>
    </div>
  );
}
