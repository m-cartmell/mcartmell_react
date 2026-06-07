import { createContext, ReactNode } from 'react';
import marsStyles from '@/scss/pages/MARS.module.scss';
import dalStyles from '@/scss/pages/DAL.module.scss';
import statusStyles from '@/scss/pages/Status.module.scss';
import refaliStyles from '@/scss/pages/Refali.module.scss';
import prideStyles from '@/scss/pages/Pride.module.scss';
import fastStyles from '@/scss/pages/Fast.module.scss';
import johnsonsStyles from '@/scss/pages/Johnsons.module.scss';
import genieStyles from '@/scss/pages/Genie.module.scss';
import cmjStyles from '@/scss/pages/CMJ.module.scss';
import wongsStyles from '@/scss/pages/Wongs.module.scss';
import emailStyles from '@/scss/pages/Email.module.scss';
import travelStyles from '@/scss/pages/Travel.module.scss';

type ClientStyles = typeof marsStyles;

interface WorkContextType {
  actions: {
    clientStyles: (slug: string) => ClientStyles;
  };
}

interface ProviderProps {
  children: ReactNode;
}

export const WorkContext = createContext<WorkContextType | null>(null);

export const Provider = ({ children }: ProviderProps) => {
  const clientStyles = (slug: string) => {
    if (slug.includes('mars-fitness-app')) return marsStyles;
    if (slug.includes('digital-asset-library')) return dalStyles;
    if (slug.includes('status')) return statusStyles;
    if (slug.includes('refali')) return refaliStyles;
    if (slug.includes('pride')) return prideStyles;
    if (slug.includes('fast')) return fastStyles;
    if (slug.includes('johnsons')) return johnsonsStyles;
    if (slug.includes('genie')) return genieStyles;
    if (slug.includes('cmj')) return cmjStyles;
    if (slug.includes('wongs')) return wongsStyles;
    if (slug.includes('email')) return emailStyles;

    return travelStyles;
  };

  return (
    <WorkContext.Provider
      value={{
        actions: {
          clientStyles,
        },
      }}
    >
      {children}
    </WorkContext.Provider>
  );
};
