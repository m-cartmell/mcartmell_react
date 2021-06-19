import Head from 'next/head';
import { getGalleryContent } from '../lib/content';
import styles from '../scss/pages/Home.module.scss';
import GalleryControls from '../Components/Assembly/GalleryControls';
import GalleryImages from '../Components/Assembly/GalleryImages';

export async function getStaticProps() {
  const content = getGalleryContent();

  return {
    props: {
      content,
    },
  };
}

export default function Home({ content }) {
  return (
    <>
      <Head>
        <title>Designer + Developer | Matt Cartmell</title>
        <meta
          name="description"
          content="A multidisciplinary graphic designer and developer, delivering projects across email, print, social and web."
        />
      </Head>
      <section className={styles.top_content}>
        <h1>Designer + Developer</h1>
        <GalleryControls content={content} />
      </section>
      <section id="gallery" className={styles.gallery}>
        <GalleryImages content={content} />
      </section>
    </>
  );
}
