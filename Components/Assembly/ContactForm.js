import styles from '../../scss/assembly/ContactForm.module.scss';
import PlusIcon from '../Assembly/Icons/PlusIcon';
import { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function contactForm({ closeModal }) {
  const form = useRef(null);
  const notification = useRef(null);
  const send = useRef(null);
  const [token, setToken] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    // Notifies user the form is sending
    send.current.textContent = 'Sending';

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => {
      // Clears form fields
      reset();
      // Hides form for notification block
      form.current.style.display = 'none';
      if (res.ok) {
        // Injects success notice
        notification.current.classList.add(styles.delivered);
        notification.current.textContent = 'Success, your message sent.';
      } else {
        // Injects failure notice
        notification.current.classList.add(styles.undelivered);
        notification.current.innerHTML = `There's been an issue sending your message, you could try my <a title="My LinkedIn" href="https://www.linkedin.com/in/m-cartmell/" target="_blank" rel="noreferrer">LinkedIn</a>`;
      }
    });
  };

  const errorMessage = (email) => {
    // Checks for email, as only exception
    return (
      <span className={styles.validation_error}>
        {email ? 'Invalid email' : 'Required'}
      </span>
    );
  };

  const getToken = () => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)
        .then((res) => setToken(res));
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    document.body.appendChild(script);
    script.addEventListener('load', getToken);
    return () => script.removeEventListener('load', getToken);
  }, []);

  return (
    <div className={styles.container}>
      <h2>Send a message&hellip;</h2>
      <form
        name="contactForm"
        role="form"
        onSubmit={handleSubmit(onSubmit)}
        ref={form}
      >
        <p className={styles.input_group}>
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            className={errors.name && styles.error}
            type="text"
            {...register('name', { required: true })}
          />
          {errors.name && errorMessage()}
        </p>

        {/* Bot trap */}
        <p className={styles.agent}>
          <label htmlFor="last-name">Last Name</label>
          <input id="last-name" type="text" {...register('last-name')} />
        </p>

        <p className={styles.input_group}>
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            className={errors.email && styles.error}
            type="email"
            {...register('email', {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.email && errorMessage(errors.email)}
        </p>
        <p className={styles.input_group}>
          <label htmlFor="subject">Subject *</label>
          <input
            id="subject"
            className={errors.subject && styles.error}
            type="text"
            {...register('subject', { required: true })}
          />
          {errors.subject && errorMessage()}
        </p>
        <p className={styles.input_group}>
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            className={errors.message && styles.error}
            {...register('message', { required: true })}
          />
          {errors.message && errorMessage()}
        </p>

        {/* ReCaptcha token input */}
        <input type="hidden" {...register('token')} />

        <button
          className="block"
          title="Send form"
          type="submit"
          ref={send}
          onClick={() => setValue('token', token)}
        >
          Send
        </button>
        <div className={styles.recaptcha_text}>
          This site is protected by reCAPTCHA and the Google{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
            title="Visit Page"
          >
            Privacy Policy
          </a>{' '}
          and{' '}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noreferrer"
            title="Visit Page"
          >
            Terms of Service
          </a>{' '}
          apply.
        </div>
      </form>
      <button
        className={`plain ${styles.close}`}
        id="close_form"
        title="Close form"
        type="button"
        onClick={closeModal}
      >
        <PlusIcon customStyle={styles.icon} />
      </button>
      <p id={styles.notification} ref={notification}></p>
    </div>
  );
}
