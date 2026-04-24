import styles from '../../scss/assembly/ContactForm.module.scss';
import PlusIcon from '../Assembly/Icons/PlusIcon';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import Script from 'next/script';

export default function ContactForm({ closeModal }) {
  const form = useRef(null);
  const notification = useRef(null);
  const send = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClose = () => {
    reset();

    if (form.current) {
      form.current.style.display = '';
    }

    if (notification.current) {
      notification.current.innerHTML = '';
      notification.current.classList.remove(styles.delivered);
      notification.current.classList.remove(styles.undelivered);
    }

    if (send.current) {
      send.current.textContent = 'Send';
    }

    closeModal();
  };

  const onSubmit = async (data) => {
    // Notifies user the form is sending
    send.current.textContent = 'Sending';

    // window.grecaptcha safeguard
    if (!window.grecaptcha) {
      notification.current.classList.add(styles.undelivered);
      notification.current.textContent =
        'Captcha failed to load. Please try again.';
      send.current.textContent = 'Send';
      return;
    }

    const token = await new Promise((resolve) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {
            action: 'contact_form',
          })
          .then(resolve);
      });
    });

    const payload = { ...data, token };

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      // Failure notice
      notification.current.classList.add(styles.undelivered);
      notification.current.innerHTML = `There's been an issue sending your message, you could try my <a title="My LinkedIn" href="https://www.linkedin.com/in/m-cartmell/" target="_blank" rel="noreferrer">LinkedIn</a>.`;
      send.current.textContent = 'Send';
      return;
    }

    reset();

    // Hides form
    form.current.style.display = 'none';

    // Success notice
    notification.current.classList.add(styles.delivered);
    notification.current.textContent = 'Your message has been sent.';
  };

  // eslint-disable-next-line react-hooks/refs
  const submitForm = handleSubmit(onSubmit);

  const errorMessage = (email) => {
    // Checks for email, as only exception
    return (
      <span className={styles['validation-error']}>
        {email ? 'Invalid email' : 'Required'}
      </span>
    );
  };

  return (
    <div className={styles.container}>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      <h2>Send a message&hellip;</h2>
      <form name="contactForm" role="form" onSubmit={submitForm} ref={form}>
        <p className={styles['input-group']}>
          <label htmlFor="name">Name *</label>
          <input
            autoComplete="name"
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
          <input
            autoComplete="off"
            id="last-name"
            type="text"
            {...register('last-name')}
          />
        </p>

        <p className={styles['input-group']}>
          <label htmlFor="email">Email *</label>
          <input
            autoComplete="email"
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
        <p className={styles['input-group']}>
          <label htmlFor="subject">Subject *</label>
          <input
            autoComplete="off"
            id="subject"
            className={errors.subject && styles.error}
            type="text"
            {...register('subject', { required: true })}
          />
          {errors.subject && errorMessage()}
        </p>
        <p className={styles['input-group']}>
          <label htmlFor="message">Message *</label>
          <textarea
            autoComplete="off"
            id="message"
            className={errors.message && styles.error}
            {...register('message', { required: true })}
          />
          {errors.message && errorMessage()}
        </p>

        <button className="block" title="Send form" type="submit" ref={send}>
          Send
        </button>
      </form>
      <button
        className={classNames('plain', styles.close)}
        title="Close form"
        type="button"
        onClick={handleClose}
      >
        <PlusIcon customStyle={styles.icon} />
      </button>
      <p id={styles.notification} ref={notification} />
    </div>
  );
}
