import { readdirSync, readFileSync } from 'fs';

// Returns page filenames object
const getFiles = () => {
  return readdirSync(`./content`);
};

// Returns page content json object
const readContent = (query) => {
  const file = readdirSync(`./content`).find((file) =>
    file.endsWith(`${query}.json`),
  );
  const data = readFileSync(`./content/${file}`);
  return JSON.parse(data);
};

// Returns prev/next page
const pageNav = (query) => {
  const pageList = getFiles();
  const page = pageList.find((path) => path.endsWith(`${query}.json`));
  const index = pageList.indexOf(page);
  const maxIndex = pageList.length - 1;
  const prevPage = pageList[index - 1];
  const nextPage = pageList[index + 1];
  const getId = (file) => {
    return file.split('_')[1].replace(/\.json$/, '');
  };
  const prev = index > 0 ? getId(prevPage) : null;
  const prevClient = index > 0 ? readContent(prev).client : null;
  const next = index < maxIndex ? getId(nextPage) : null;
  const nextClient = index < maxIndex ? readContent(next).client : null;

  return {
    prev: { id: prev, client: prevClient },
    next: { id: next, client: nextClient },
  };
};

// Formats a string
export function prepString(data) {
  return data.toString().replace(/\s+/g, '-').toLowerCase().replace(/,/g, ' ');
}

// Returns page paths object
export function getPaths() {
  return getFiles().map((fileName) => {
    return {
      params: {
        id: fileName.split('_')[1].replace(/\.json$/, ''),
      },
    };
  });
}

// Returns gallery data object
export function getGalleryContent() {
  return getPaths().map((path) => {
    return getContent(path.params.id);
  });
}

// Returns page data object
export function getContent(query) {
  const content = readContent(query);
  const { description, heading, client, categories, text, images } = content;
  const { prev, next } = pageNav(query);

  return {
    params: {
      id: query,
      title: `${client} | ${heading}`,
      description,
      heading,
      client,
      categories,
      text: text ? text : null,
      gallery: images.gallery ? images.gallery : null,
      topImages: images.top ? images.top : null,
      mainImages: images.main ? images.main : null,
      lowerImages: images.lower ? images.lower : null,
      prev,
      next,
    },
  };
}
