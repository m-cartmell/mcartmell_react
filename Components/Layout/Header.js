import Link from 'next/link';
import Head from 'next/head';
import TypeIt from '../Assembly/TypeIt';
import styles from '../../scss/layout/Header.module.scss';

export default function Header() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Barlow:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#a6acaf" />
        <meta name="theme-color" content="#ffffff" />

        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments)}
              gtag("js", new Date());
              gtag("config", "${process.env.NEXT_PUBLIC_GOOGLE_ID}");
            `,
          }}
        ></script>
      </Head>
      <header className={styles.container}>
        <Link href="/">
          <a title="Home page" className={styles.identity}>
            mc<span className={styles.full}>artmell</span>.
          </a>
        </Link>
        <TypeIt />
      </header>
    </>
  );
}
