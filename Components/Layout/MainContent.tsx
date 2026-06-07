import styles from '@/scss/layout/MainContent.module.scss';
import Accordion from '@/Components/Assembly/Accordion';
import CustomImage from '@/Components/Assembly/CustomImage';
import classNames from 'classnames';
import SkillTags from '@/Components/Assembly/SkillTags';
import PageNav from '@/Components/Assembly/PageNav';
import useWorkContext from '@/hooks/useWorkContext';
import type { ContentPageType } from '@/lib/content';
import type { ContentImage } from '@/types/contentTypes';

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
}: ContentPageType) {
  const { actions } = useWorkContext();
  const clientStyles = actions.clientStyles(slug);

  // Selects client page styles
  const {
    'main-content': mainContent,
    'image-block': imageBlock,
    'info-block': infoBlock,
  } = clientStyles;

  const renderText = () => {
    if (text) {
      return text.map((para: string, index: number) => {
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
        {slug.includes('wongs') && mainImages && !Array.isArray(mainImages) && (
          <Accordion block={mainImages} {...{ client, slug }} />
        )}
        {slug.includes('mars-fitness-app') &&
          Array.isArray(mainImages) &&
          mainImages.map((image: ContentImage, index: number) => {
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
          <div className={styles['width-wrapper']}>
            <h2>{client}</h2>
            {renderText()}
          </div>
          <div className={styles.wrapper}>
            {Array.isArray(skills) && (
              <SkillTags data={skills} align={skillTagsAlign} />
            )}
            <PageNav next={nav?.next} prev={nav?.prev} align={skillTagsAlign} />
          </div>
        </div>
      </div>
      {slug === 'travel' && (
        <div className="elfsight-app-599e27b4-e246-43dd-a8a2-e4d58b0a6d43" />
      )}
    </section>
  );
}
