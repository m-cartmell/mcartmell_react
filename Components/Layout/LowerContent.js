import styles from '../../scss/layout/LowerContent.module.scss';
import Accordion from '../Assembly/Accordion';
import { useContext } from 'react';
import { Work } from '../Context';
import CustomImage from '../Assembly/CustomImage';
import classNames from 'classnames';

export default function LowerContent({ client, lowerImages, slug }) {
  const { actions } = useContext(Work);
  const clientStyles = actions.clientStyles(slug);
  const getObjValues = () => Object.values(lowerImages);

  // Selects client page styles
  const {
    'lower-content': lowerContent,
    column,
    'content-block': contentBlock,
  } = clientStyles;

  const defineColumns = (block) => {
    // Pages – SS / Refali / JJ
    if (block.length % 3 === 0) return 'x3';
    else if (block.length % 2 === 0) {
      // Pages – MARS / PJ / CMJ
      if (block.length > 2) return 'x4';
      // Pages – GBC / Refali
      else return 'x2';
    } else return 'single'; // Pages – FT
  };

  const renderImage = (block) => {
    if ('accordion' in block) {
      // Pages – FT / JJ / GBC / CMJ / EM
      return <Accordion block={block} {...{ client, slug }} />;
    } else {
      return block.map((image, index) => {
        return (
          <div
            className={classNames(
              'column',
              defineColumns(block),
              styles.column,
              column,
              'reveal-item',
            )}
            key={`${slug}${index}`}
          >
            <figure>
              <CustomImage {...{ client, image, slug }} />
              {image.caption && <figcaption>{image.caption}</figcaption>}
            </figure>
          </div>
        );
      });
    }
  };

  if (lowerImages) {
    return (
      <section className={classNames(styles.container, lowerContent)}>
        {getObjValues().map((block, index) => {
          return (
            <div
              className={classNames(
                'content-block',
                styles['content-block'],
                contentBlock,
              )}
              key={`${slug}${index}`}
            >
              {renderImage(block)}
            </div>
          );
        })}
      </section>
    );
  } else return null;
}
