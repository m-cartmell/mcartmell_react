import { createContext } from 'react';
import statusStyles from '../../scss/pages/Status.module.scss';
import refaliStyles from '../../scss/pages/Refali.module.scss';
import prideStyles from '../../scss/pages/Pride.module.scss';
import fastStyles from '../../scss/pages/Fast.module.scss';
import johnsonsStyles from '../../scss/pages/Johnsons.module.scss';
import genieStyles from '../../scss/pages/Genie.module.scss';
import cmjStyles from '../../scss/pages/CMJ.module.scss';
import wongsStyles from '../../scss/pages/Wongs.module.scss';
import emailStyles from '../../scss/pages/Email.module.scss';
import facetsStyles from '../../scss/pages/Facets.module.scss';
import oxfamStyles from '../../scss/pages/Oxfam.module.scss';
import travelStyles from '../../scss/pages/Travel.module.scss';

export const Portfolio = createContext({});

export const Provider = ({ children }) => {
  const clientStyles = (id) => {
    if (id.includes('status')) return statusStyles;
    else if (id.includes('refali')) return refaliStyles;
    else if (id.includes('pride')) return prideStyles;
    else if (id.includes('fast')) return fastStyles;
    else if (id.includes('johnsons')) return johnsonsStyles;
    else if (id.includes('genie')) return genieStyles;
    else if (id.includes('cmj')) return cmjStyles;
    else if (id.includes('wongs')) return wongsStyles;
    else if (id.includes('email')) return emailStyles;
    else if (id.includes('facets')) return facetsStyles;
    else if (id.includes('oxfam')) return oxfamStyles;
    else return travelStyles;
  };

  return (
    <Portfolio.Provider
      value={{
        actions: {
          clientStyles,
        },
      }}
    >
      {children}
    </Portfolio.Provider>
  );
};
