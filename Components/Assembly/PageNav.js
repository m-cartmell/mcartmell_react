import Link from 'next/link';
import styles from '../../scss/assembly/PageNav.module.scss';
import classNames from 'classnames';

export default function PageNav({ prev, next }) {
  const pages = {
    prevPage: {
      ...prev,
      titleStart: 'Prev:',
      style: styles.prev,
      label: 'Prev',
    },
    nextPage: {
      ...next,
      titleStart: 'Next:',
      style: styles.next,
      label: 'Next',
    },
  };

  const renderLink = (page) => {
    if (page.id) {
      return (
        <Link
          className={classNames('button', styles.button, page.style)}
          href={`/work/${page.id}`}
          title={`${page.titleStart} ${page.client}`}
        >
          {page.label}
        </Link>
      );
    }
  };

  return (
    <div className={styles.container}>
      {renderLink(pages.prevPage)}
      <Link
        className={classNames('button', styles.button)}
        href="/"
        title="Back to Home"
      >
        Home
      </Link>
      {renderLink(pages.nextPage)}
    </div>
  );
}
