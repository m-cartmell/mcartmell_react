import Link from 'next/link';
import Head from 'next/head';
import styles from '../scss/pages/Custom404.module.scss';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 | Page Not Found</title>
      </Head>
      <section className={styles['main-content']}>
        <h1>404 – Page Not Found</h1>
        <p>
          Oops! It looks like the page you&apos;re looking for doesn&apos;t
          exist.
        </p>
        <Link className="button" href="/" title="Home page">
          Home
        </Link>
      </section>
    </>
  );
}
