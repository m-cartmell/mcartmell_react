import Link from 'next/link';
import styles from '../../scss/assembly/GalleryImages.module.scss';
import { prepString } from '../../lib/content';
import Image from './Image';

export default function GalleryImages({ content }) {
  return (
    <>
      {content.map((item) => {
        const { id, categories, client, gallery } = item.params;

        return (
          <Link href={`/portfolio/${id}`} key={`${id}-link`}>
            <a className={`${styles.container} item ${prepString(categories)}`}>
              <Image client={client} id={id} image={gallery} />
              <div className={styles.overlay}>
                <div className={styles.details}>
                  <h2>{client}</h2>
                  <div className={styles.categories}>
                    {categories.map((category, index) => {
                      return (
                        <span
                          className={styles.category}
                          key={`${id}-cat${index}`}
                        >
                          {category}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </a>
          </Link>
        );
      })}
    </>
  );
}
