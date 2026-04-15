import styles from '../../scss/layout/LowerContent.module.scss';
import Accordion from '../Assembly/Accordion';
import { useContext } from 'react';
import { Work } from '../Context';
import CustomImage from '../Assembly/CustomImage';
import LightBoxImage from '../Assembly/LightBoxImage';
import classNames from 'classnames';

export default function LowerContent({ client, id, lowerImages }) {
  const { actions } = useContext(Work);
  const clientStyles = actions.clientStyles(id);
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
      // Pages – PJ / CMJ
      if (block.length > 2) return 'x4';
      // Pages – GBC / Refali
      else return 'x2';
    } else return 'single'; // Pages – FT
  };

  const renderImage = (block) => {
    if ('accordion' in block) {
      // Pages – FT / JJ / GBC / CMJ / EM
      return <Accordion client={client} id={id} block={block} />;
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
            key={`${id}${index}`}
          >
            {image.light_box ? (
              <LightBoxImage
                images={block}
                client={client}
                id={id}
                image={image}
              />
            ) : (
              <CustomImage client={client} id={id} image={image} />
            )}
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
              key={`${id}${index}`}
            >
              {renderImage(block)}
            </div>
          );
        })}
      </section>
    );
  } else return null;
}
