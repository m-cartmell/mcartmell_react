import styles from '../../scss/assembly/GalleryControls.module.scss';
import { prepString } from '../../lib/helpers';
import { useRef, useEffect, useState } from 'react';
import classNames from 'classnames';

export default function GalleryControls({ content }) {
  const iso = useRef();
  const [filter, setFilter] = useState('*');

  // Init an Isotope object
  useEffect(() => {
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

  const handleFilter = (key) => () => setFilter(key);

  const categorySet = () => {
    const categories = [];

    content.map((item) => {
      categories.push(...item.categories);
    });

    return [...new Set(categories.sort())];
  };

  return (
    <div className={styles.container}>
      <button
        className={classNames('plain', { [styles.selected]: filter === '*' })}
        type="button"
        onClick={handleFilter('*')}
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
            onClick={handleFilter(prepString(cat))}
            key={`control${index}`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}
