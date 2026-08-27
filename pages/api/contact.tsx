import nodemailer from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import type { NextApiRequest, NextApiResponse } from 'next';

const contact = async (req: NextApiRequest, res: NextApiResponse) => {
  // .env variables
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PW, EMAIL_TO } =
    process.env;

  // req. fields
  const { subject, name, email, message } = req.body;

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

  if (honeypot) {
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
