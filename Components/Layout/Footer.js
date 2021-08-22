import styles from '../../scss/layout/Footer.module.scss';
import LinkedInIcon from '../Assembly/Icons/LinkedInIcon';
import EnvelopeIcon from '../Assembly/Icons/EnvelopeIcon';
import { useState } from 'react';
import Modal from './Modal';

export default function Footer() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <footer className={styles.container}>
        <div className={styles.icons}>
          <a
            className={styles.wrap}
            title="My LinkedIn"
            href="https://www.linkedin.com/in/m-cartmell/"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon />
          </a>
          <button
            className={`plain ${styles.wrap}`}
            id="show_form"
            title="Message me"
            type="button"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <EnvelopeIcon />
          </button>
        </div>
        <div>&copy; mcartmell.&nbsp;{new Date().getFullYear()}</div>
      </footer>
      <Modal show={showModal} setShow={setShowModal} />
    </>
  );
}
