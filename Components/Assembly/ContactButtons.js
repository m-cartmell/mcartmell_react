import { useState } from 'react';
import classNames from 'classnames';
import LinkedInIcon from './Icons/LinkedInIcon';
import EnvelopeIcon from './Icons/EnvelopeIcon';
import Modal from '../Layout/Modal';
import styles from '../../scss/assembly/ContactButtons.module.scss';

const ContactButtons = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <button
          className={classNames('plain', styles.icon)}
          id="show_form"
          title="Message me"
          type="button"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <EnvelopeIcon />
        </button>
        <a
          className={styles.icon}
          href="https://www.linkedin.com/in/m-cartmell/"
          rel="noopener noreferrer"
          target="_blank"
          title="My LinkedIn"
        >
          <LinkedInIcon />
        </a>
      </div>
      <Modal show={showModal} setShow={setShowModal} />
    </>
  );
};

export default ContactButtons;
