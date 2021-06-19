import { useState, useRef } from 'react';
import WindowTopBar from './WindowTopBar';
import PlusIcon from '../Assembly/Icons/PlusIcon';
import styles from '../../scss/assembly/Accordion.module.scss';
import Image from './Image';

export default function Accordion({ client, id, block }) {
  const blockKeys = Object.keys(block);

  const defineColumns = () => {
    if (id.includes('email')) return 'x4';
    else if (id.includes('wongs')) return 'x2';
    else return 'web_page';
  };

  const hiddenImages = useRef([]);

  return blockKeys.map((item, index) => {
    const [isOpen, setIsOpen] = useState(false);
    const accordionIndex = index;

    const open = () => {
      const image = hiddenImages.current[accordionIndex];
      const imageHeight = image.scrollHeight;

      image.style.height = !isOpen ? `${imageHeight}px` : '0';
    };

    return (
      <div
        className={`column ${styles.container} ${defineColumns()}`}
        key={`${id}${accordionIndex}`}
      >
        <div className={styles.wrapper}>
          <WindowTopBar />
          {block[item].map((image, index) => {
            const imageIndex = index;

            return (
              <div
                className={styles.image}
                key={imageIndex}
                ref={(ref) => {
                  if (imageIndex === 1) hiddenImages.current.push(ref);
                }}
              >
                <Image client={client} id={id} image={image} />
              </div>
            );
          })}
          <button
            className={`plain ${styles.expand}`}
            title="Expand Image"
            type="button"
            onClick={() => {
              setIsOpen(!isOpen);
              open();
            }}
          >
            <PlusIcon
              customStyle={styles.icon}
              rotate={isOpen ? styles.rotate : ''}
            />
          </button>
        </div>
      </div>
    );
  });
}
