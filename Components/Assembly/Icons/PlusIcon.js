import styles from '../../../scss/assembly/Icon.module.scss';

export default function PlusIcon({ customStyle }) {
  return (
    <svg
      className={`${styles.item} ${customStyle}`}
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 77 77"
    >
      <path d="M73.5,35H42V3.5a3.5,3.5,0,0,0-7,0V35H3.5a3.5,3.5,0,0,0,0,7H35V73.5a3.5,3.5,0,0,0,7,0V42H73.5a3.5,3.5,0,0,0,0-7Z"></path>
    </svg>
  );
}
