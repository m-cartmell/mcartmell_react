import styles from '../../scss/assembly/WindowTopBar.module.scss';

export default function WindowTopBar({ containerClass, btnClass }) {
  return (
    <div
      className={`${styles.container} ${containerClass ? containerClass : ''}`}
    >
      <span className={`${styles.btn} ${btnClass ? btnClass : ''}`}></span>
      <span className={`${styles.btn} ${btnClass ? btnClass : ''}`}></span>
      <span className={`${styles.btn} ${btnClass ? btnClass : ''}`}></span>
    </div>
  );
}
