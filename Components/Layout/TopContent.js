import styles from '../../scss/layout/TopContent.module.scss';
import { useContext } from 'react';
import { Work } from '../Context';
import RefaliLogo from '../Assembly/RefaliLogo';
import CustomImage from '../Assembly/CustomImage';
import classNames from 'classnames';

export default function TopContent({ client, id, topImages }) {
  const { actions } = useContext(Work);
  const clientStyles = actions.clientStyles(id);

  // Selects client page styles
  const { 'top-content': topContent, single } = clientStyles;

  if (topImages) {
    const bannerType =
      topImages.length > 1
        ? `${styles.double}`
        : `${single ? single : ''} single`;

    return (
      <section
        className={classNames(styles.container, topContent, {
          ['reveal-item']: topImages.length === 2,
        })}
      >
        {topImages.map((image, index) => {
          return (
            <div
              className={classNames(styles.column, bannerType, {
                ['reveal-item']: topImages.length === 1,
              })}
              key={`${id}${index}`}
            >
              <CustomImage client={client} id={id} image={image} />
            </div>
          );
        })}
      </section>
    );
  } else if (client === 'Refali') {
    return (
      <section className={classNames(styles.container, topContent)}>
        <div
          className={classNames(styles.column, single, 'single', 'reveal-item')}
        >
          <RefaliLogo clientStyles={clientStyles} />
        </div>
      </section>
    );
  } else return null;
}
