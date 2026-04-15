'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ContactForm from '../Assembly/ContactForm';
import styles from '../../scss/layout/Modal.module.scss';
import classNames from 'classnames';

export default function Modal({ show, setShow }) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef(null);

  const closeModal = useCallback(() => {
    setShow(false);
  }, [setShow]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!show) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    // Move focus into modal
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [show, closeModal]);

  if (!mounted) return null;

  const modalRoot = document.getElementById('modal');
  if (!modalRoot) return null;

  return createPortal(
    <div
      className={classNames(styles.container, {
        [styles.visible]: show,
      })}
      onClick={show ? closeModal : undefined}
      aria-hidden={!show}
    >
      <div
        className={styles.zone}
        onClick={(e) => e.stopPropagation()}
        ref={dialogRef}
      >
        <ContactForm closeModal={closeModal} />
      </div>
    </div>,
    modalRoot,
  );
}
