import { useRef } from 'react';
import styles from '../../scss/layout/TopContent.module.scss';
import { useContext } from 'react';
import { Work } from '../Context';
import RefaliLogo from '../Assembly/RefaliLogo';
import CustomImage from '../Assembly/CustomImage';
import classNames from 'classnames';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function TopContent({ client, slug, topImages }) {
  const { actions } = useContext(Work);
  const clientStyles = actions.clientStyles(slug);
  const refaliLogoContainer = useRef();

  // Selects client page styles
  const {
    'top-content': topContent,
    single,
    'refali-logo': refaliLogo,
    'logo-mask': refaliLogoMask,
    'logo-base': refaliLogoBase,
    'logo-reveal': refaliLogoReveal,
  } = clientStyles;

  // Refali logo annimation
  useGSAP(
    () => {
      const el = refaliLogoContainer?.current?.querySelector(
        `.${refaliLogoReveal}`,
      );
      if (!el) return;

      gsap.to(el, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.8,
      });
    },
    { scope: refaliLogoContainer },
  );

  if (topImages) {
    const bannerType =
      topImages.length > 1
        ? `${styles.double}`
        : `${single ? single : ''} single`;

    return (
      <section
        className={classNames(styles.container, topContent, {
          ['reveal-image']: topImages.length === 2,
        })}
      >
        {topImages.map((image, index) => {
          return (
            <div
              className={classNames(styles.column, bannerType, {
                ['reveal-image']: topImages.length === 1,
              })}
              key={`${slug}${index}`}
            >
              <CustomImage {...{ client, image, slug }} />
            </div>
          );
        })}
      </section>
    );
  } else if (client === 'Refali') {
    return (
      <section
        className={classNames(styles.container, topContent)}
        ref={refaliLogoContainer}
      >
        <div
          className={classNames(
            styles.column,
            single,
            'single',
            'reveal-image',
          )}
        >
          <div className={refaliLogoMask}>
            <RefaliLogo
              classes={classNames(refaliLogo, refaliLogoBase)}
              className={refaliLogoBase}
              {...{ clientStyles }}
            />
            <RefaliLogo
              classes={classNames(refaliLogo, refaliLogoReveal)}
              className={refaliLogoReveal}
              {...{ clientStyles }}
            />
          </div>
        </div>
      </section>
    );
  } else return null;
}
