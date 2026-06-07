import { readdirSync, readFileSync } from 'fs';
import type { ContentImage } from '@/types/contentTypes';
import type { AccordionBlockType } from '@/Components/Assembly/Accordion';

type ImageBlock = ContentImage[] | AccordionBlockType;

export type NavSlug = { slug?: string };

export type ContentPageType = {
  slug: string;
  title?: string;
  description?: string;
  heading?: string;
  client: string;
  categories?: string[];
  text?: string[] | null;
  gallery?: ContentImage | null;
  topImages?: ContentImage[] | null;
  mainImages?: ImageBlock | null;
  lowerImages?: { [key: string]: ImageBlock } | null;
  singleColumnSummary?: boolean;
  skills?: string[] | null;
  skillTagsAlign?: string | null;
  nav?: {
    prev: NavSlug;
    next: NavSlug;
  };
};

const contentMap = (() => {
  const fileList = readdirSync('./content');

  const map = new Map();

  fileList.forEach((filename) => {
    const data = JSON.parse(readFileSync(`./content/${filename}`, 'utf8'));

    if (!data.slug) return;

    map.set(data.slug, data);
  });

  return new Map([...map].sort((a, b) => a[1].position - b[1].position));
})();

const contentData = () => contentMap;

const pageNav = (query: string) => {
  const entries = [...contentData().entries()];
  const index = entries.findIndex(([slug]) => slug === query);

  const prevEntry = entries[index - 1];
  const nextEntry = entries[index + 1];

  return {
    prev: prevEntry ? { slug: prevEntry[0] } : { slug: null },
    next: nextEntry ? { slug: nextEntry[0] } : { slug: null },
  };
};

export function getPaths() {
  return [...contentData().keys()].map((slug) => ({
    params: { slug },
  }));
}

export function getGalleryContent() {
  return getPaths().map((path) => {
    return getContent(path.params.slug);
  });
}

export type GalleryContent = ReturnType<typeof getGalleryContent>;

export function getContent(slug: string): ContentPageType {
  const content = contentData().get(slug);

  const {
    description,
    heading,
    client,
    categories,
    text,
    images,
    singleColumnSummary,
    skills,
    skillTagsAlign,
  } = content;

  const { prev, next } = pageNav(slug);

  return {
    slug,
    title: `${client} | ${heading}`,
    description,
    heading,
    client,
    categories,
    text: text ?? null,
    gallery: images.gallery ?? null,
    topImages: images.top ?? null,
    mainImages: images.main ?? null,
    lowerImages: images.lower ?? null,
    singleColumnSummary: Boolean(singleColumnSummary),
    skills: skills?.length ? skills : null,
    skillTagsAlign: skillTagsAlign ?? null,
    nav: { prev, next },
  };
}
