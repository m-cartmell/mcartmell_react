import { getPaths, getContent } from '../../lib/content';
import Head from 'next/head';
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

export default function Portfolio({ pageContent }) {
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
    prev,
    next,
  } = content;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {id === 'travel' && (
          <script src="https://apps.elfsight.com/p/platform.js" defer></script>
        )}
      </Head>
      <TopContent client={client} id={id} topImages={topImages} />
      <MainContent
        id={id}
        heading={heading}
        client={client}
        text={text}
        mainImages={mainImages}
      />
      <LowerContent client={client} id={id} lowerImages={lowerImages} />
      <PageNav prev={prev} next={next} />
    </>
  );
}
