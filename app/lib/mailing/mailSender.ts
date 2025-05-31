import nodemailer from 'nodemailer';

export async function sendMail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Tournoi" <no-reply@gmail.com>',
    to: to,
    subject: subject,
    html: html,
  });
}

export async function sendEmailVerification(email: string, token: string) {
  const uRL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?token=${token}`;

  await sendMail(
    email,
    'Confirmez votre adresse email',
    `<p>Cliquez ici pour valider votre adresse email : <a href="${uRL}">${uRL}</a></p>`,
  );
}
