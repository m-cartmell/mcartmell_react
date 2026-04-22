import Link from 'next/link';
import styles from '../../scss/assembly/PageNav.module.scss';
import classNames from 'classnames';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons/ArrowIcons';

export default function PageNav({ prev, next, align }) {
  const pages = {
    prevPage: {
      ...prev,
      label: 'Prev',
    },
    nextPage: {
      ...next,
      label: 'Next',
    },
  };

  const isLeftAligned = align === 'left';

  const renderLink = (page) => {
    if (!page?.slug) return null;

    const isPrev = page.label.toLowerCase() === 'prev';

    return (
      <Link className={styles.button} href={`/work/${page.slug}`}>
        {isPrev && <ArrowLeftIcon className={styles.icon} />}
        <span>{page.label}</span>
        {!isPrev && <ArrowRightIcon className={styles.icon} />}
      </Link>
    );
  };

  return (
    <div
      className={classNames(styles.container, 'reveal-item', {
        [styles['right-align']]: !isLeftAligned,
      })}
    >
      {renderLink(pages.prevPage)}
      {renderLink(pages.nextPage)}
    </div>
  );
}
