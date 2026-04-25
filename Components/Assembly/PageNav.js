import Link from 'next/link';
import styles from '../../scss/assembly/PageNav.module.scss';
import classNames from 'classnames';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons/ArrowIcons';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

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
        {isPrev && (
          <ArrowLeftIcon className={classNames(styles.icon, 'nav-left')} />
        )}
        <span>{page.label}</span>
        {!isPrev && (
          <ArrowRightIcon className={classNames(styles.icon, 'nav-right')} />
        )}
      </Link>
    );
  };

  useGSAP(() => {
    const leftIcons = gsap.utils.toArray('.nav-left');
    const rightIcons = gsap.utils.toArray('.nav-right');

    const animate = (el, dir) => {
      const idle = gsap.to(el, {
        x: 4 * dir,
        duration: 1.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        paused: true,
        delay: 1.4,
      });

      const hover = gsap.to(el, {
        x: 9 * dir,
        duration: 0.18,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
        paused: true,
        onStart: () => idle.pause(),
        onComplete: () => idle.play(),
      });

      // nudge on page load
      gsap.fromTo(
        el,
        { x: 0 },
        {
          x: 8 * dir,
          duration: 0.22,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
          delay: 0.8,
          onComplete: () => idle.play(),
        },
      );

      el.closest('a')?.addEventListener('mouseenter', () => {
        hover.play(0);
      });
    };

    leftIcons.forEach((el) => animate(el, -1));
    rightIcons.forEach((el) => animate(el, 1));
  });

  return (
    <div
      className={classNames(styles.container, {
        [styles['right-align']]: !isLeftAligned,
      })}
    >
      {renderLink(pages.prevPage)}
      {renderLink(pages.nextPage)}
    </div>
  );
}
