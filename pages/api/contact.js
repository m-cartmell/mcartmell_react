import nodemailer from 'nodemailer';

const Contact = async (req, res) => {
  // .env variables
  const {
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PW,
    EMAIL_TO,
    RECAPTCHA_SECRET_KEY,
  } = process.env;

  // req. fields
  const { token, subject, name, email, message } = req.body;

  // Honeypot field
  const honeypot = req.body['last-name'];

  // reCAPTCHA v3
  const params = new URLSearchParams({
    secret: RECAPTCHA_SECRET_KEY,
    response: token,
    remoteip: req.socket.remoteAddress,
  });
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
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PW,
    },
  });

  if (honeypot || !recaptcha.success || recaptcha.score < 0.5) {
    return res.status(400).json({ error: 'Verification failed' });
  }

  // Specifies the email options
  const mail = {
    from: `mcartmell.com ${EMAIL_USER}`,
    to: EMAIL_TO,
    subject,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
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

export default Contact;
