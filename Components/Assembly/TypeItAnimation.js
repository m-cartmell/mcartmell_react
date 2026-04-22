import TypeIt from 'typeit-react';
import { usePathname } from 'next/navigation';
import styles from '../../scss/layout/Header.module.scss';

export default function TypeItAnimation() {
  const pathname = usePathname();

  return (
    <div className={styles['type-it']}>
      <TypeIt
        key={pathname}
        options={{
          speed: 130,
          deleteSpeed: 100,
          breakLines: false,
          lifeLike: true,
          loop: true,
          loopDelay: 6000,
          cursorSpeed: 900,
          startDelay: 1000,
        }}
        getBeforeInit={(instance) => {
          instance
            .type('I think')
            .pause(1500)
            .delete(5)
            .pause(500)

            .type('design')
            .pause(1500)
            .delete(6)
            .pause(500)

            .type('build')
            .pause(2300);

          return instance;
        }}
      />
    </div>
  );
}
