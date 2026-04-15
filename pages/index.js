import Head from 'next/head';
import { getGalleryContent } from '../lib/content';
import styles from '../scss/pages/Home.module.scss';
import GalleryControls from '../Components/Assembly/GalleryControls';
import GalleryImages from '../Components/Assembly/GalleryImages';
import SkillTags from '../Components/Assembly/SkillTags';
import classNames from 'classnames';

const skills = {
  Languages: ['JavaScript (ES6+)', 'HTML', 'CSS', 'Sass'],
  'Frameworks & Libraries': [
    'React',
    'Next.js',
    'Node.js',
    'React Native',
    'Apollo GraphQL',
  ],
  'Tools & Platforms': [
    'Git',
    'Bitbucket Pipelines (CI/CD)',
    'AWS S3',
    'Android',
    'Adobe Creative Cloud',
  ],
  Databases: ['MongoDB'],
};

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
        <title>Software developer & designer | Matt Cartmell</title>
        <meta
          name="description"
          content="Full-stack developer and designer building end-to-end web and mobile applications with modern JavaScript."
        />
      </Head>
      <section className={styles['top-content']}>
        <div className={styles['info-block']}>
          <h1 className="reveal-item">Software developer & designer</h1>
          <p className="reveal-item">
            <span className={styles.intro}>
              Focused on building complete, end-to-end digital products.
            </span>
            <span>
              I specialise in JavaScript across Node.js, React, and React
              Native, creating scalable applications with Apollo GraphQL,
              WebSockets, MongoDB, and cloud-based asset storage. With a
              multidisciplinary design background, I deliver cohesive,
              user-focused experiences across mobile and web.
            </span>
          </p>
        </div>
        <SkillTags data={skills} />
      </section>
      <section className={classNames(styles['gallery-section'], 'reveal-item')}>
        <GalleryControls content={content} />
        <div id="gallery" className={styles.gallery}>
          <GalleryImages content={content} />
        </div>
      </section>
    </>
  );
}
