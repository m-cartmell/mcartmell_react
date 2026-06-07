import styles from '@/scss/assembly/WindowTopBar.module.scss';
import classNames from 'classnames';

interface WindowTopBarProps {
  btnClass?: string;
  containerClass?: string;
}

export default function WindowTopBar({
  btnClass,
  containerClass,
}: WindowTopBarProps) {
  const colors = ['red', 'yellow', 'green'];

  return (
    <div className={classNames(styles.container, containerClass)}>
      {colors.map((color) => (
        <span
          key={color}
          className={classNames(styles.btn, styles[color], btnClass)}
        />
      ))}
    </div>
  );
}
