import styles from '../../scss/layout/MainContent.module.scss';
import { useContext } from 'react';
import { Work } from '../Context';
import Accordion from '../Assembly/Accordion';
import CustomImage from '../Assembly/CustomImage';
import classNames from 'classnames';
import SkillTags from '../Assembly/SkillTags';
import PageNav from '../Assembly/PageNav';

export default function MainContent({
  heading,
  client,
  text,
  mainImages,
  nav,
  singleColumnSummary,
  skills,
  skillTagsAlign,
  slug,
}) {
  const { actions } = useContext(Work);
  const clientStyles = actions.clientStyles(slug);

  // Selects client page styles
  const {
    'main-content': mainContent,
    'image-block': imageBlock,
    'info-block': infoBlock,
  } = clientStyles;

  const renderText = () => {
    if (text) {
      return text.map((para, index) => {
        return <p key={index}>{para}</p>;
      });
    }
  };

  const renderExceptions = () => {
    return (
      <div
        className={classNames(
          'column',
          styles.column,
          styles['image-block'],
          imageBlock,
          {
            'reveal-image': !slug.includes('wongs'),
          },
        )}
      >
        {slug.includes('wongs') && (
          <Accordion block={mainImages} {...{ client, slug }} />
        )}
        {slug.includes('mars-fitness-app') &&
          mainImages.map((image, index) => {
            return (
              <CustomImage
                key={`${slug}${index}`}
                {...{ client, image, slug }}
              />
            );
          })}
      </div>
    );
  };

  return (
    <section className={classNames(styles.container, mainContent)}>
      {mainImages && renderExceptions()}
      <div
        className={classNames(
          'column',
          styles.column,
          styles['info-block'],
          infoBlock,
        )}
      >
        <h1 className="reveal-text">{heading}</h1>
        <div
          className={classNames(styles.summary, {
            [styles['single-column']]: singleColumnSummary,
          })}
        >
          <div className={classNames(styles['width-wrapper'], 'reveal-item')}>
            <h2>{client}</h2>
            {renderText()}
          </div>
          <div className={classNames(styles.wrapper, 'reveal-item')}>
            <SkillTags data={skills} align={skillTagsAlign} />
            <PageNav next={nav.next} prev={nav.prev} align={skillTagsAlign} />
          </div>
        </div>
      </div>
      {slug === 'travel' && (
        <div className="elfsight-app-599e27b4-e246-43dd-a8a2-e4d58b0a6d43" />
      )}
    </section>
  );
}
