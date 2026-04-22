import { createContext } from 'react';
import marsStyles from '../../scss/pages/MARS.module.scss';
import dalStyles from '../../scss/pages/DAL.module.scss';
import statusStyles from '../../scss/pages/Status.module.scss';
import refaliStyles from '../../scss/pages/Refali.module.scss';
import prideStyles from '../../scss/pages/Pride.module.scss';
import fastStyles from '../../scss/pages/Fast.module.scss';
import johnsonsStyles from '../../scss/pages/Johnsons.module.scss';
import genieStyles from '../../scss/pages/Genie.module.scss';
import cmjStyles from '../../scss/pages/CMJ.module.scss';
import wongsStyles from '../../scss/pages/Wongs.module.scss';
import emailStyles from '../../scss/pages/Email.module.scss';
import travelStyles from '../../scss/pages/Travel.module.scss';

export const Work = createContext({});

export const Provider = ({ children }) => {
  const clientStyles = (slug) => {
    if (slug.includes('mars-fitness-app')) return marsStyles;
    else if (slug.includes('digital-asset-library')) return dalStyles;
    else if (slug.includes('status')) return statusStyles;
    else if (slug.includes('refali')) return refaliStyles;
    else if (slug.includes('pride')) return prideStyles;
    else if (slug.includes('fast')) return fastStyles;
    else if (slug.includes('johnsons')) return johnsonsStyles;
    else if (slug.includes('genie')) return genieStyles;
    else if (slug.includes('cmj')) return cmjStyles;
    else if (slug.includes('wongs')) return wongsStyles;
    else if (slug.includes('email')) return emailStyles;
    else return travelStyles;
  };

  return (
    <Work.Provider
      value={{
        actions: {
          clientStyles,
        },
      }}
    >
      {children}
    </Work.Provider>
  );
};
