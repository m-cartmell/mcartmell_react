import TypeIt from 'typeit-react';
import styles from '../../scss/layout/Header.module.scss';

export default function TypeItAnimation() {
  return (
    <div id={styles.type_it}>
      <TypeIt
        options={{
          strings: ['I think.', 'I question.', 'I design.', 'I build.'],
          speed: 200,
          breakLines: false,
          lifeLike: true,
          loop: true,
          loopDelay: 6000,
          nextStringDelay: [1000, 2000],
          cursorSpeed: 1200,
          startDelay: 2000,
        }}
      />
    </div>
  );
}
