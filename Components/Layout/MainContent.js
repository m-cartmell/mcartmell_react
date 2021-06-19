import styles from '../../scss/layout/MainContent.module.scss';
import { useContext } from 'react';
import { Portfolio } from '../Context';
import Accordion from '../Assembly/Accordion';
import WindowTopBar from '../Assembly/WindowTopBar';
import Image from '../Assembly/Image';
import OxfamLightBoxImage from '../Assembly/OxfamLightBoxImage';

export default function MainContent({ id, heading, client, text, mainImages }) {
  const { actions } = useContext(Portfolio);
  const clientStyles = actions.clientStyles(id);

  // Selects client page styles
  const {
    main_content,
    image_block,
    text_block,
    top_bar,
    btn,
    lightbox,
    icon,
    elfsight_container,
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
        className={`column ${styles.column} ${styles.image_block} ${image_block}`}
      >
        {id.includes('wongs') && (
          <Accordion client={client} id={id} block={mainImages} />
        )}
        {id.includes('facets') && (
          <WindowTopBar containerClass={top_bar} btnClass={btn} />
        )}
        {id.includes('facets') &&
          mainImages.map((image, index) => {
            return (
              <Image
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
      className={`${styles.container} ${main_content ? main_content : ''}`}
    >
      {mainImages && renderExceptions()}
      <div
        className={`column ${styles.column} ${styles.text_block} ${
          text_block ? text_block : ''
        }`}
      >
        <div className={styles.wrapper}>
          <h1>{heading}</h1>
          <h2>{client}</h2>
          {renderText()}
        </div>
      </div>
      {id === 'travel' && (
        <div
          className={`elfsight-app-599e27b4-e246-43dd-a8a2-e4d58b0a6d43 ${elfsight_container}`}
        ></div>
      )}
    </section>
  );
}
