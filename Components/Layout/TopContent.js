import styles from '../../scss/layout/TopContent.module.scss';
import { useContext } from 'react';
import { Portfolio } from '../Context';
import RefaliLogo from '../Assembly/RefaliLogo';
import Image from '../Assembly/Image';

export default function TopContent({ client, id, topImages }) {
  const { actions } = useContext(Portfolio);
  const clientStyles = actions.clientStyles(id);

  // Selects client page styles
  const { top_content } = clientStyles;

  if (topImages) {
    const bannerType = topImages.length > 1 ? `${styles.double}` : 'single';

    return (
      <section
        className={`${styles.container} ${top_content ? top_content : ''}`}
      >
        {topImages.map((image, index) => {
          return (
            <div
              className={`${styles.column} ${bannerType}`}
              key={`${id}${index}`}
            >
              <Image client={client} id={id} image={image} />
            </div>
          );
        })}
      </section>
    );
  } else if (client === 'Refali') {
    return (
      <section className={`${styles.container} ${top_content}`}>
        <div className={`${styles.column} single`}>
          <RefaliLogo clientStyles={clientStyles} />
        </div>
      </section>
    );
  } else return null;
}
