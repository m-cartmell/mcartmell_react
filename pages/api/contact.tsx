import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import type { NextApiRequest, NextApiResponse } from 'next';

const contact = async (req: NextApiRequest, res: NextApiResponse) => {
  // .env variables
  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PW,
    EMAIL_TO,
    RECAPTCHA_SECRET_KEY,
  } = process.env;

  if (!RECAPTCHA_SECRET_KEY) {
    return res.status(500).json({ error: 'Missing reCAPTCHA secret key' });
  }

  // req. fields
  const { token, subject, name, email, message } = req.body;

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ error: 'Missing reCAPTCHA token' });
  }

  // reCAPTCHA v3
  const params = new URLSearchParams({
    secret: RECAPTCHA_SECRET_KEY,
    response: token,
  });

  if (req.socket.remoteAddress) {
    params.append('remoteip', req.socket.remoteAddress);
  }

  const recaptcha = await fetch(
    'https://www.google.com/recaptcha/api/siteverify',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    },
  ).then((res) => res.json());

  // Initiates the SMTP server
  const port = Number(EMAIL_PORT);

  if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PW || !Number.isInteger(port)) {
    throw new Error('Missing or invalid SMTP environment variables');
  }

  const options: SMTPTransport.Options = {
    host: EMAIL_HOST,
    port,
    secure: port === 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PW,
    },
  };

  const transporter = nodemailer.createTransport(options);

  // Honeypot field
  const honeypot = req.body.lastName;

  if (honeypot || !recaptcha.success || recaptcha.score < 0.5) {
    return res.status(400).json({ error: 'Verification failed' });
  }

  const trimmedMessage = message.trim();

  // Specifies the email options
  const mail = {
    from: `mcartmell.com <${EMAIL_USER}>`,
    to: EMAIL_TO,
    replyTo: email,
    subject,
    text: `${trimmedMessage}\n\n---\nName: ${name}\nEmail: ${email}`,
    html: `
      <p>${trimmedMessage}</p>
      <hr />
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
    `,
  };

  try {
    await transporter.sendMail(mail);

    console.log('Email sent');
    return res.status(200).json({ success: true });
  } catch (err) {
    console.log('Email failed!', err);
    return res.status(500).json({ error: 'Email failed' });
  }
};

export default contact;
