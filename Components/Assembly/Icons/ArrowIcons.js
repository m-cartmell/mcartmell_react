import styles from '../../../scss/assembly/Icon.module.scss';
import classNames from 'classnames';

export function ArrowLeftIcon({ className }) {
  return (
    <svg
      className={classNames(styles.item, className)}
      viewBox="0 0 511.97 384.15"
      aria-hidden="true"
    >
      <path
        d="M9.38,169.47c-12.5,12.5-12.5,32.8,0,45.3l160,160c12.5,12.5,32.8,12.5,45.3,0s12.5-32.8,0-45.3l-105.4-105.4h370.7c17.7,0,32-14.3,32-32s-14.3-32-32-32H109.28l105.4-105.4c12.5-12.5,12.5-32.8,0-45.3s-32.8-12.5-45.3,0L9.38,169.37v.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ArrowRightIcon({ className }) {
  return (
    <svg
      className={classNames(styles.item, className)}
      viewBox="0 0 511.97 384.15"
      aria-hidden="true"
    >
      <path
        d="M502.6,214.68c12.5-12.5,12.5-32.8,0-45.3L342.6,9.38c-12.5-12.5-32.8-12.5-45.3,0s-12.5,32.8,0,45.3l105.4,105.4H32c-17.7,0-32,14.3-32,32s14.3,32,32,32h370.7l-105.4,105.4c-12.5,12.5-12.5,32.8,0,45.3s32.8,12.5,45.3,0l160-160v-.1Z"
        fill="currentColor"
      />
    </svg>
  );
}
