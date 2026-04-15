import { useCallback, useEffect, useState, useRef } from 'react';
import WindowTopBar from './WindowTopBar';
import PlusIcon from '../Assembly/Icons/PlusIcon';
import styles from '../../scss/assembly/Accordion.module.scss';
import CustomImage from './CustomImage';
import classNames from 'classnames';

export default function Accordion({ client, id, block }) {
  const blockKeys = Object.keys(block);
  const hiddenImages = useRef([]);
  const [open, setOpen] = useState(undefined);
  const [close, setClose] = useState(undefined);
  const [images, setImages] = useState(null);

  const mechanism = useCallback(
    (index) => {
      const img = images[index];
      const imgHeight = img.scrollHeight;

      // If !open, returns '0'
      img.style.height = open ? `${imgHeight}px` : '0';

      // Only allows one accordion to be open at a time
      images.map((_, i) => {
        const img = images[i];

        if (img && index !== i) img.style.height = '0';
      });
    },
    [images, open],
  );

  const defineColumns = () => {
    if (id.includes('email')) return 'x4';
    else if (id.includes('wongs')) return 'x2';
    else return 'web-page';
  };

  // Makes an intial copy of the hiddenImages
  useEffect(() => {
    setImages([...hiddenImages.current]);
  }, []);

  useEffect(() => {
    if (open) mechanism(+open);
    else if (close) mechanism(+close);
  }, [mechanism, close, open]);

  return blockKeys.map((item, index) => {
    return (
      <div
        className={classNames(
          'column',
          styles.container,
          defineColumns(),
          'reveal-item',
        )}
        key={`${id}${index}`}
      >
        <div className={styles.wrapper}>
          <WindowTopBar />
          <div className={styles['image-blocks']}>
            {block[item].map((image, i) => {
              return (
                <div
                  className={styles.image}
                  key={i}
                  ref={(ref) => {
                    if (i === 1) hiddenImages.current.push(ref);
                  }}
                >
                  <CustomImage client={client} id={id} image={image} />
                </div>
              );
            })}
          </div>
          <button
            className={classNames('plain', styles.expand, {
              [styles.rotate]: +open === index,
            })}
            onClick={() => {
              const target = `${index}`;
              if (target === open) {
                setOpen(undefined);
                setClose(target);
              } else setOpen(target);
            }}
            title="Expand Image"
            type="button"
          >
            <PlusIcon customStyle={styles.icon} />
          </button>
        </div>
      </div>
    );
  });
}
