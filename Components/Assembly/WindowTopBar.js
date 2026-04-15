import styles from '../../scss/assembly/WindowTopBar.module.scss';
import classNames from 'classnames';

export default function WindowTopBar({ containerClass, btnClass }) {
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
