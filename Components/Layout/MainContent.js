import styles from '../../scss/layout/MainContent.module.scss';
import { useContext } from 'react';
import { Work } from '../Context';
import Accordion from '../Assembly/Accordion';
import WindowTopBar from '../Assembly/WindowTopBar';
import CustomImage from '../Assembly/CustomImage';
import OxfamLightBoxImage from '../Assembly/OxfamLightBoxImage';
import classNames from 'classnames';
import SkillTags from '../Assembly/SkillTags';

export default function MainContent({
  id,
  heading,
  client,
  text,
  mainImages,
  skills,
  skillTagsAlign,
}) {
  const { actions } = useContext(Work);
  const clientStyles = actions.clientStyles(id);

  // Selects client page styles
  const {
    'main-content': mainContent,
    'image-block': imageBlock,
    'info-block': infoBlock,
    'top-bar': topBar,
    btn,
    lightbox,
    icon,
    elfsight_container,
  } = clientStyles;

  const renderText = () => {
    if (text) {
      return text.map((para, index) => {
        return (
          <p className="reveal-item" key={index}>
            {para}
          </p>
        );
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
            'reveal-item': !id.includes('wongs'),
          },
        )}
      >
        {id.includes('wongs') && (
          <Accordion client={client} id={id} block={mainImages} />
        )}
        {id.includes('facets') && (
          <WindowTopBar containerClass={topBar} btnClass={btn} />
        )}
        {id.includes('facets') &&
          mainImages.map((image, index) => {
            return (
              <CustomImage
                client={client}
                id={id}
                image={image}
                key={`${id}${index}`}
              />
            );
          })}
        {id.includes('oxfam') &&
          mainImages.map((image, index) => {
            return (
              <OxfamLightBoxImage
                client={client}
                id={id}
                image={image}
                key={`${id}${index}`}
                lightBoxClass={lightbox}
                iconClass={icon}
              />
            );
          })}
      </div>
    );
  };

  return (
    <section
      className={classNames(styles.container, styles.container, mainContent)}
    >
      {mainImages && renderExceptions()}
      <div
        className={classNames(
          'column',
          styles.column,
          styles['info-block'],
          infoBlock,
        )}
      >
        <div className={styles.wrapper}>
          <h1 className="reveal-item">{heading}</h1>
          <h2 className="reveal-item">{client}</h2>
          {renderText()}
        </div>
        <SkillTags data={skills} align={skillTagsAlign} />
      </div>
      {id === 'travel' && (
        <div
          className={classNames(
            'elfsight-app-599e27b4-e246-43dd-a8a2-e4d58b0a6d43',
            elfsight_container,
          )}
        />
      )}
    </section>
  );
}
