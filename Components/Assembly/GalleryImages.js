import Link from 'next/link';
import styles from '../../scss/assembly/GalleryImages.module.scss';
import skillStyles from '../../scss/assembly/SkillTags.module.scss';
import { prepString } from '../../lib/content';
import CustomImage from './CustomImage';
import classNames from 'classnames';

export default function GalleryImages({ content }) {
  return (
    <>
      {content.map((item) => {
        const { heading, id, categories, client, gallery, skills } =
          item.params;

        const skillList = skills ? Object.values(skills).flat() : [];

        return (
          <Link
            className={classNames(
              styles.container,
              'item',
              prepString(categories),
            )}
            href={`/work/${id}`}
            key={`${id}-link`}
          >
            <CustomImage client={client} id={id} image={gallery} />
            <div className={styles.overlay}>
              <div className={styles.details}>
                <h2>{heading}</h2>
                <p className={styles.client}>{client}</p>
                {!!skillList.length && (
                  <div className={styles.skills}>
                    {skillList.map((s) => (
                      <span
                        key={`${id}-${s}`}
                        className={skillStyles['tag-white']}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </>
  );
}
