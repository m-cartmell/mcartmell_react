import Head from 'next/head';
import { getGalleryContent } from '../lib/content';
import styles from '../scss/pages/Home.module.scss';
import GalleryControls from '../Components/Assembly/GalleryControls';
import GalleryImages from '../Components/Assembly/GalleryImages';
import classNames from 'classnames';
import ExperienceCarousel from '../Components/Assembly/ExperienceCarousel';

export async function getStaticProps() {
  const content = getGalleryContent();

  return {
    props: { content },
  };
}

export default function Home({ content }) {
  return (
    <>
      <Head>
        <title>Software developer & designer | Matt Cartmell</title>
        <meta
          name="description"
          content="Full-stack developer and designer building end-to-end web and mobile applications with modern JavaScript."
        />
      </Head>
      <section className={styles['top-content']}>
        <h1 className="reveal-item">Software developer & designer</h1>
        <div className={styles['info-block']}>
          <div className={styles.summary}>
            <p className="reveal-item">
              <span className={styles.intro}>
                Focused on building complete, end-to-end digital products.
              </span>
              <span>
                I specialise in JavaScript across Node.js, React, and React
                Native, building scalable applications and connected platforms
                across mobile and web. With a multidisciplinary design
                background, I deliver cohesive, user-focused products from
                interface through to backend systems and integrations.
              </span>
            </p>
          </div>
          <ExperienceCarousel />
        </div>
      </section>
      <section className={styles['gallery-section']}>
        <GalleryControls content={content} />
        <div id="gallery" className={classNames(styles.gallery, 'reveal-item')}>
          <GalleryImages content={content} />
        </div>
      </section>
    </>
  );
}
