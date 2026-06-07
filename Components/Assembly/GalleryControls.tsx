import { useRef, useEffect, useState } from 'react';
import styles from '@/scss/assembly/GalleryControls.module.scss';
import { prepString } from '@/lib/helpers';
import classNames from 'classnames';
import type { ContentPageType } from '@/lib/content';
import Isotope from 'isotope-layout';

interface GalleryControlsProps {
  content: ContentPageType[];
}

export default function GalleryControls({ content }: GalleryControlsProps) {
  const iso = useRef<Isotope | null>(null);
  const [filter, setFilter] = useState('*');

  // Init an Isotope object
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Isotope = require('isotope-layout');

    iso.current = new Isotope('#gallery', {
      itemSelector: '.item',
      layoutMode: 'fitRows',
      transitionDuration: '0.35s',
    });

    // Cleanup
    return () => iso.current?.destroy();
  }, []);

  // Handle filter change
  useEffect(() => {
    if (!iso.current) return;

    iso.current.arrange({
      filter: filter === '*' ? '*' : `.${filter}`,
    });

    requestAnimationFrame(() => {
      iso.current?.layout();
    });
  }, [filter]);

  const handleFilter = (key?: string): void => {
    if (!key) return;

    setFilter(key);
  };

  const categorySet = () => {
    const categories: string[] = [];

    content.forEach((item) => {
      if (item.categories?.length) categories.push(...item.categories);
    });

    return [...new Set(categories.sort())];
  };

  return (
    <div className={styles.container}>
      <button
        className={classNames('plain', { [styles.selected]: filter === '*' })}
        type="button"
        onClick={() => handleFilter('*')}
      >
        All
      </button>
      {categorySet().map((cat, index) => {
        return (
          <button
            className={classNames('plain', {
              [styles.selected]: filter === prepString(cat),
            })}
            type="button"
            onClick={() => handleFilter(prepString(cat))}
            key={`control${index}`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
