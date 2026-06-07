import styles from '@/scss/layout/LowerContent.module.scss';
import Accordion, {
  type AccordionBlockType,
} from '@/Components/Assembly/Accordion';
import CustomImage from '@/Components/Assembly/CustomImage';
import classNames from 'classnames';
import useWorkContext from '@/hooks/useWorkContext';
import type { ContentPageType } from '@/lib/content';
import type { ContentImage } from '@/types/contentTypes';

export default function LowerContent({
  client,
  lowerImages,
  slug,
}: ContentPageType) {
  const { actions } = useWorkContext();
  const clientStyles = actions.clientStyles(slug);

  // Selects client page styles
  const {
    'lower-content': lowerContent,
    column,
    'content-block': contentBlock,
  } = clientStyles;

  const defineColumns = (block: ContentImage[]) => {
    // Pages – SS / Refali / JJ
    if (block.length % 3 === 0) return 'x3';
    else if (block.length % 2 === 0) {
      // Pages – MARS / PJ / CMJ
      if (block.length > 2) return 'x4';
      // Pages – GBC / Refali
      else return 'x2';
    } else return 'single'; // Pages – FT
  };

  const renderImage = (block: ContentImage[] | AccordionBlockType) => {
    if (!Array.isArray(block)) {
      // Pages – FT / JJ / GBC / CMJ / EM
      return <Accordion {...{ block, client, slug }} />;
    }

    return block.map((image, index) => (
      <div
        className={classNames(
          'column',
          defineColumns(block),
          styles.column,
          column,
          'reveal-image',
        )}
        key={`${slug}${index}`}
      >
        <figure>
          <CustomImage {...{ client, image, slug }} />
          {image.caption && <figcaption>{image.caption}</figcaption>}
        </figure>
      </div>
    ));
  };

  if (lowerImages) {
    return (
      <section className={classNames(styles.container, lowerContent)}>
        {Object.values(lowerImages).map((block, index) => {
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
