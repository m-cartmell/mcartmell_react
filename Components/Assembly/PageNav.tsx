import Link from 'next/link';
import styles from '@/scss/assembly/PageNav.module.scss';
import classNames from 'classnames';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@/Components/Assembly/Icons/ArrowIcons';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import type { NavSlug } from '@/lib/content';

interface PageNavProps {
  prev?: NavSlug;
  next?: NavSlug;
  align?: string | null;
}

interface Page extends NavSlug {
  label: string;
}

export default function PageNav({ prev, next, align }: PageNavProps) {
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

  const renderLink = (page: Page) => {
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
    const leftIcons = gsap.utils.toArray<Element>('.nav-left');
    const rightIcons = gsap.utils.toArray<Element>('.nav-right');

    const cleanups: (() => void)[] = [];

    const animate = (el: Element, dir: number) => {
      const idle = gsap.to(el, {
        x: 4 * dir,
        duration: 1.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.2,
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

      const link = el.closest('a');

      const onMouseEnter = () => {
        hover.play(0);
      };

      link?.addEventListener('mouseenter', onMouseEnter);

      cleanups.push(() => {
        link?.removeEventListener('mouseenter', onMouseEnter);
        idle.kill();
        hover.kill();
      });
    };

    leftIcons.forEach((el) => animate(el, -1));
    rightIcons.forEach((el) => animate(el, 1));

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
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
