import styles from '../../scss/assembly/SkillTags.module.scss';
import classNames from 'classnames';

const SkillTags = ({ data, align }) => {
  if (!data || typeof data !== 'object' || !Object.keys(data).length) {
    return null;
  }

  const skillGroups = Object.keys(data);
  const isLeftAligned = align === 'left';

  return (
    <div
      className={classNames(styles.container, {
        [styles['container-left']]: isLeftAligned,
      })}
    >
      <h2 className={classNames(styles.h2, 'reveal-item')}>Skills</h2>
      {skillGroups.map((k) => (
        <div
          key={k}
          className={classNames(styles.group, {
            [styles['group-left']]: isLeftAligned,
          })}
        >
          <p className={classNames(styles['group-heading'], 'reveal-item')}>
            {k}
          </p>
          <div
            className={classNames(styles.tags, 'reveal-item', {
              [styles['tags-left']]: isLeftAligned,
            })}
          >
            {data[k].map((s) => (
              <span key={s} className={styles.tag}>
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillTags;
