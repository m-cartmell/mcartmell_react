import styles from '../../scss/layout/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.container}>
      &copy; 2021–{new Date().getFullYear()} Matt Cartmell.{' '}
      All&nbsp;rights&nbsp;reserved.
    </footer>
  );
}
