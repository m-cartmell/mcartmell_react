import Link from 'next/link';
import Head from 'next/head';
import TypeIt from '../Assembly/TypeIt';
import styles from '../../scss/layout/Header.module.scss';

export default function Header() {
  return (
    <>
      <Head>
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
      </Head>
      <header className={styles.header}>
        <Link
          className={styles['identity-container']}
          href="/"
          title="Home page"
        >
          <span>Matt Cartmell</span>
          <TypeIt />
        </Link>
      </header>
    </>
  );
}
