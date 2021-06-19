import Link from 'next/link';
import styles from '../../scss/assembly/PageNav.module.scss';

export default function PageNav({ prev, next }) {
  const pages = {
    prevPage: {
      ...prev,
      titleStart: 'Previous page:',
      style: styles.prev,
      label: 'Prev',
    },
    nextPage: {
      ...next,
      titleStart: 'Next page:',
      style: styles.next,
      label: 'Next',
    },
  };

  const renderLink = (page) => {
    if (page.id) {
      return (
        <Link href={`/portfolio/${page.id}`}>
          <a
            title={`${page.titleStart} ${page.client}`}
            className={`button ${styles.button} ${page.style}`}
          >
            {page.label}
          </a>
        </Link>
      );
    }
  };

  return (
    <div className={styles.container}>
      {renderLink(pages.prevPage)}
      <Link href="/">
        <a title="Home page" className={`button ${styles.button}`}>
          Home
        </a>
      </Link>
      {renderLink(pages.nextPage)}
    </div>
  );
}
