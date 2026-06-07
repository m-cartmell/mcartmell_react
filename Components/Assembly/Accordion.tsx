import { useCallback, useEffect, useState, useRef } from 'react';
import WindowTopBar from '@/Components/Assembly/WindowTopBar';
import PlusIcon from '@/Components/Assembly/Icons/PlusIcon';
import styles from '@/scss/assembly/Accordion.module.scss';
import CustomImage from '@/Components/Assembly/CustomImage';
import classNames from 'classnames';
import type { ContentImage } from '@/types/contentTypes';

export type AccordionBlockType = {
  [key: string]: ContentImage[];
};

interface AccordionProps {
  block: AccordionBlockType;
  client: string;
  slug: string;
}

export default function Accordion({ block, client, slug }: AccordionProps) {
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [open, setOpen] = useState<number | undefined>(undefined);
  const [close, setClose] = useState<number | undefined>(undefined);

  const mechanism = useCallback(
    (index: number | undefined) => {
      if (index === undefined) return;

      const images = panelsRef.current;
      const img = images[index];

      if (!img) return;

      const imgHeight = img.scrollHeight;

      img.style.height = open !== undefined ? `${imgHeight}px` : '0';

      // Only allows one accordion to be open at a time
      images.forEach((img, i) => {
        if (img && index !== i) img.style.height = '0';
      });
    },
    [open],
  );

  const defineColumns = () => {
    if (slug.includes('email')) return 'x4';
    else if (slug.includes('wongs')) return 'x2';
    else return 'web-page';
  };

  useEffect(() => {
    if (open !== undefined) mechanism(open);
    else if (close !== undefined) mechanism(close);
  }, [mechanism, close, open]);

  return Object.entries(block).map(([key, images], index) => {
    return (
      <div
        className={classNames(
          'column',
          styles.container,
          defineColumns(),
          'reveal-image',
        )}
        key={`${slug}${key}`}
      >
        <div className={styles.wrapper}>
          <WindowTopBar />
          <div className={styles['image-blocks']}>
            {images.map((image, i) => {
              return (
                <div
                  className={styles.image}
                  key={i}
                  ref={(el) => {
                    if (i === 1) panelsRef.current[index] = el;
                  }}
                >
                  <CustomImage {...{ client, image, slug }} />
                </div>
              );
            })}
          </div>
          <button
            className={classNames('plain', styles.expand, {
              [styles.rotate]: open === index,
            })}
            onClick={() => {
              if (index === open) {
                setOpen(undefined);
                setClose(index);
              } else setOpen(index);
            }}
            title="Expand Image"
            type="button"
          >
            <PlusIcon className={styles.icon} />
          </button>
        </div>
      </div>
    );
  });
}
