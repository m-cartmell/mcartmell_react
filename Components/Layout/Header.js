import Link from 'next/link';
import Head from 'next/head';
import TypeItAnimation from '../Assembly/TypeItAnimation';
import styles from '../../scss/layout/Header.module.scss';

export default function Header() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="mcartmell" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <header className={styles.header}>
        <Link
          className={styles['identity-container']}
          href="/"
          title="Home page"
        >
          <span>Matt Cartmell</span>
          <TypeItAnimation />
        </Link>
      </header>
    </>
  );
}
