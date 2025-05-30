import nodemailer from 'nodemailer';

export async function sendEmailVerification(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?token=${token}`;

  await transporter.sendMail({
    from: '"Tournoi" <no-reply@gmail.com>',
    to: email,
    subject: 'Confirmez votre adresse email',
    html: `<p>Cliquez ici pour valider votre adresse email : <a href="${url}">${url}</a></p>`,
  });
}
