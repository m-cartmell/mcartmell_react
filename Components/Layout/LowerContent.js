import styles from '../../scss/layout/LowerContent.module.scss';
import Accordion from '../Assembly/Accordion';
import { useContext } from 'react';
import { Portfolio } from '../Context';
import Image from '../Assembly/Image';
import LightBoxImage from '../Assembly/LightBoxImage';

export default function LowerContent({ client, id, lowerImages }) {
  const { actions } = useContext(Portfolio);
  const clientStyles = actions.clientStyles(id);
  const getObjValues = () => Object.values(lowerImages);

  // Selects client page styles
  const { lower_content, column, content_block } = clientStyles;

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
            className={`column ${defineColumns(block)} ${styles.column} ${
              column ? column : ''
            }`}
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
              <Image client={client} id={id} image={image} />
            )}
          </div>
        );
      });
    }
  };

  if (lowerImages) {
    return (
      <section
        className={`${styles.container} ${lower_content ? lower_content : ''}`}
      >
        {getObjValues().map((block, index) => {
          return (
            <div
              className={`content_block ${styles.content_block} ${
                content_block ? content_block : ''
              }`}
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
