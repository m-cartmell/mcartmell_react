import nodemailer from 'nodemailer';

export default async function (req, res) {
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
  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}&remoteip=${req.socket.remoteAddress}`;

  const recaptcha = await fetch(url, { method: 'POST' }).then((res) =>
    res.json(),
  );

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

  // Specifies the email options
  const mail = {
    from: `mcartmell.com ${EMAIL_USER}`,
    to: EMAIL_TO,
    subject: subject,
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  };

  console.log(req.body);

  // Sends the email if honeypot and reCAPTCHA conditions are met
  if (!honeypot && recaptcha.success && recaptcha.score >= 0.5) {
    transporter.sendMail(mail, (err) => {
      if (err) {
        console.log('Email failed!');
        res.status(400).end();
      } else {
        console.log('Email sent');
        res.status(200).end();
      }
    });
  }
}
