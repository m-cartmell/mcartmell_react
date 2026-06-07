import { getPaths, getContent } from '@/lib/content';
import Head from 'next/head';
import Script from 'next/script';
import TopContent from '@/Components/Layout/TopContent';
import MainContent from '@/Components/Layout/MainContent';
import LowerContent from '@/Components/Layout/LowerContent';
import type { GetStaticProps, GetStaticPaths } from 'next';
import type { ContentPageType } from '@/lib/content';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getPaths();

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string;
  const pageContent = getContent(slug);

  return {
    props: pageContent,
  };
};

export default function Work({
  slug,
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
  nav,
}: ContentPageType) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      {slug === 'travel' && (
        <Script
          src="https://apps.elfsight.com/p/platform.js"
          strategy="afterInteractive"
        />
      )}
      <TopContent {...{ client, slug, topImages }} />
      <MainContent
        {...{
          client,
          heading,
          slug,
          mainImages,
          nav,
          text,
          singleColumnSummary,
          skills,
          skillTagsAlign,
        }}
      />
      <LowerContent {...{ client, slug, lowerImages }} />
    </>
  );
}
