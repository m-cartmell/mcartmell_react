import styles from '../../scss/assembly/tags.module.scss';
import classNames from 'classnames';

const SkillTags = ({ data, align }) => {
  if (!data || !Array.isArray(data)) {
    return null;
  }

  const isLeftAligned = align === 'left';

  return (
    <div
      className={classNames(styles.container, {
        [styles['container-left']]: isLeftAligned,
      })}
    >
      <h2 className={styles.h2}>Skills</h2>
      <div
        className={classNames(styles.tags, {
          [styles['tags-left']]: isLeftAligned,
        })}
      >
        {data.map((s) => (
          <span key={s} className={styles.tag}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillTags;
