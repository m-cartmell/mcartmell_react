import { useRef, useState } from 'react';
import classNames from 'classnames';
import LinkedInIcon from './Icons/LinkedInIcon';
import EnvelopeIcon from './Icons/EnvelopeIcon';
import Modal from '../Layout/Modal';
import styles from '../../scss/assembly/ContactButtons.module.scss';
import ContactForm from './ContactForm';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ContactButtons = () => {
  const [showModal, setShowModal] = useState(false);
  const buttonsRef = useRef();

  // Slide in from right animation
  useGSAP(() => {
    gsap.fromTo(
      buttonsRef.current,
      { x: 40, autoAlpha: 0 },
      {
        x: 0,
        autoAlpha: 1,
        duration: 0.8,
        delay: 1.2,
        ease: 'power3.out',
      },
    );
  }, []);

  return (
    <>
      <div className={classNames(styles.container)} ref={buttonsRef}>
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
      <Modal show={showModal} setShow={setShowModal}>
        {({ closeModal }) => <ContactForm closeModal={closeModal} />}
      </Modal>
    </>
  );
};

export default ContactButtons;
