import styles from '../../scss/assembly/GalleryControls.module.scss';
import { prepString } from '../../lib/content';
import { useRef, useEffect, useState } from 'react';

export default function GalleryControls({ content }) {
  // Ref to store Isotope object
  const iso = useRef();

  // Store the filter keyword in a state
  const [filter, setFilter] = useState('*');

  // Initialize an Isotope object
  useEffect(() => {
    const Isotope = require('isotope-layout');

    iso.current = new Isotope('#gallery', {
      itemSelector: '.item',
      layoutMode: 'fitRows',
    });

    // Cleanup
    return () => iso.current.destroy();
  }, []);

  // handling filter change
  useEffect(() => {
    filter === '*'
      ? iso.current.arrange({ filter: '*' })
      : iso.current.arrange({ filter: `.${filter}` });
  }, [filter]);

  const handleFilter = (key) => () => setFilter(key);

  const categorySet = () => {
    const categories = [];

    content.map((item) => {
      categories.push(...item.params.categories);
    });

    return [...new Set(categories.sort())];
  };

  return (
    <div className={styles.container}>
      <button
        className={`plain ${filter === '*' ? styles.selected : ''}`}
        type="button"
        onClick={handleFilter('*')}
      >
        All
      </button>
      {categorySet().map((cat, index) => {
        return (
          <button
            className={`plain ${
              filter === prepString(cat) ? styles.selected : ''
            }`}
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
