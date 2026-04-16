import styles from '../../../scss/assembly/Icon.module.scss';
import classNames from 'classnames';

export function ChevronLeftIcon({ className }) {
  return (
    <svg
      className={classNames(styles.item, className)}
      viewBox="8 5 8 14"
      aria-hidden="true"
    >
      <path
        d="M15 18l-6-6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon({ className }) {
  return (
    <svg
      className={classNames(styles.item, className)}
      viewBox="8 5 8 14"
      aria-hidden="true"
    >
      <path
        d="M9 6l6 6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
