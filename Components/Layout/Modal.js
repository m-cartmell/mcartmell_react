import { useCallback, useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import ContactForm from '../Assembly/ContactForm';
import styles from '../../scss/layout/Modal.module.scss';

export default function Modal({ show, setShow }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const modal = useRef(null);
  const zone = useRef(null);

  const closeModal = useCallback(() => {
    if (show) {
      modal.current.classList.remove(styles.visible);
      setShow(false);
    }
  }, [setShow, show]);

  useEffect(() => {
    const trigger = (e) => {
      // On click outside of form || On 'esc' keydown
      if (!zone.current.contains(e.target) || e.key === 27) closeModal();
    };

    setIsBrowser(true);

    window.addEventListener('click', trigger);
    window.addEventListener('keydown', trigger);
    return () => {
      window.removeEventListener('click', trigger);
      window.removeEventListener('keydown', trigger);
    };
  }, [closeModal]);

  if (isBrowser) {
    return ReactDOM.createPortal(
      <div
        className={`${styles.container} ${show ? styles.visible : ''}`}
        ref={modal}
      >
        <div className={styles.zone} ref={zone}>
          <ContactForm closeModal={closeModal} />
        </div>
      </div>,
      document.getElementById('modal'),
    );
  } else {
    return null;
  }
}
