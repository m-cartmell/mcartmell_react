import Link from 'next/link';
import styles from '../../scss/assembly/GalleryImages.module.scss';
import tagStyles from '../../scss/assembly/tags.module.scss';
import { prepString } from '../../lib/helpers';
import CustomImage from './CustomImage';
import classNames from 'classnames';

export default function GalleryImages({ content }) {
  return (
    <>
      {content.map((item) => {
        const { heading, categories, client, gallery, skills, slug } = item;

        return (
          <Link
            className={classNames(
              styles.container,
              'item',
              prepString(categories),
            )}
            href={`/work/${slug}`}
            key={`${slug}-link`}
          >
            <CustomImage image={gallery} {...{ client, slug }} />
            <div className={styles.overlay}>
              <div className={styles.details}>
                <h2>{heading}</h2>
                <p className={styles.client}>{client}</p>
                {skills?.length && (
                  <div className={styles.skills}>
                    {skills.map((s) => (
                      <span
                        key={`${slug}-${s}`}
                        className={tagStyles['tag-white']}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <span
              className={classNames(tagStyles['tag-white'], styles['view-tag'])}
            >
              View
            </span>
          </Link>
        );
      })}
    </>
  );
}
