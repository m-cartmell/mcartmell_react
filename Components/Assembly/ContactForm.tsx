import styles from '@/scss/assembly/ContactForm.module.scss';
import PlusIcon from '@/Components/Assembly/Icons/PlusIcon';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import classNames from 'classnames';
import Script from 'next/script';

interface ContactFormProps {
  closeModal: () => void;
}

interface FormValues {
  name: string;
  email: string;
  lastName?: string;
  subject: string;
  message: string;
}

export default function ContactForm({ closeModal }: ContactFormProps) {
  const form = useRef<HTMLFormElement | null>(null);
  const notification = useRef<HTMLDivElement | null>(null);
  const send = useRef<HTMLButtonElement | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!send.current || !notification.current || !form.current) return;

    // Notifies user the form is sending
    send.current.textContent = 'Sending';

    // window.grecaptcha safeguard
    const grecaptcha = window.grecaptcha;
    if (!grecaptcha) {
      notification.current.classList.add(styles.undelivered);
      notification.current.textContent =
        'Captcha failed to load. Please try again.';
      send.current.textContent = 'Send';
      return;
    }

    if (!siteKey) {
      throw new Error('Missing NEXT_PUBLIC_RECAPTCHA_SITE_KEY');
    }

    const token = await new Promise<string>((resolve) => {
      grecaptcha.ready(() => {
        grecaptcha
          .execute(siteKey, {
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

  const errorMessage = (isEmail?: boolean) => {
    // Checks for email, as only exception
    return (
      <span className={styles['validation-error']}>
        {isEmail ? 'Invalid email' : 'Required'}
      </span>
    );
  };

  return (
    <div className={styles.container}>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${siteKey}`}
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
          <label htmlFor="lastName">Last Name</label>
          <input
            autoComplete="off"
            id="lastName"
            type="text"
            {...register('lastName')}
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
          {errors.email && errorMessage(true)}
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
        <PlusIcon className={styles.icon} />
      </button>
      <p id={styles.notification} ref={notification} />
    </div>
  );
}
