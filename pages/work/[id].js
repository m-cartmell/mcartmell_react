import { getPaths, getContent } from '../../lib/content';
import Head from 'next/head';
import Script from 'next/script';
import TopContent from '../../Components/Layout/TopContent';
import MainContent from '../../Components/Layout/MainContent';
import LowerContent from '../../Components/Layout/LowerContent';
import PageNav from '../../Components/Assembly/PageNav';

export async function getStaticPaths() {
  const paths = getPaths();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const pageContent = getContent(id);

  return {
    props: {
      pageContent,
    },
  };
}

export default function Work({ pageContent }) {
  const content = pageContent.params;
  const {
    id,
    title,
    description,
    heading,
    client,
    text,
    topImages,
    mainImages,
    lowerImages,
    singleColumnSummary,
    skills,
    skillTagsAlign,
    prev,
    next,
  } = content;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      {id === 'travel' && (
        <Script
          src="https://apps.elfsight.com/p/platform.js"
          strategy="afterInteractive"
        />
      )}
      <TopContent {...{ client, id, topImages }} />
      <MainContent
        {...{
          client,
          heading,
          id,
          mainImages,
          text,
          singleColumnSummary,
          skills,
          skillTagsAlign,
        }}
      />
      <LowerContent {...{ client, id, lowerImages }} />
      <PageNav {...{ next, prev }} />
    </>
  );
}
