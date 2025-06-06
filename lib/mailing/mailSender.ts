import nodemailer from 'nodemailer';

export function generateEmailHTML({
  title,
  text,
  buttonText,
  buttonUrl,
}: {
  title: string;
  text: string;
  buttonText: string;
  buttonUrl: string;
}) {
  return `
    <div style="background:#1a1a1a;color:#f0f0f0;padding:40px;font-family:sans-serif;max-width:600px;margin:auto;border-radius:12px;">
      <div style="text-align:center;margin-bottom:30px;">
        <img src="https://ton-domaine.com/logo.png" alt="Logo" style="width:80px;height:auto;" />
      </div>

      <h1 style="font-size:24px;margin-bottom:20px;text-align:center;">${title}</h1>

      <p style="font-size:16px;margin-bottom:30px;text-align:center;">${text}</p>

      <div style="text-align:center;">
        <a href="${buttonUrl}" style="background:#e63946;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-size:16px;">
          ${buttonText}
        </a>
      </div>

      <p style="font-size:12px;color:#888;margin-top:40px;text-align:center;">
        Si vous n’avez pas fait cette demande, vous pouvez ignorer ce message.
      </p>
    </div>
  `;
}

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
  const uRL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup/verify?token=${token}`;

  await sendMail(
    email,
    'Confirmez votre adresse email',
    generateEmailHTML({
      title: 'Bienvenue au Tournoi !',
      text: 'Pour valider votre adresse email, cliquez sur le bouton ci-dessous.',
      buttonText: 'Confirmer mon email',
      buttonUrl: uRL,
    }),
  );
}

export async function sendPasswordResetEmail(email: string, link: string) {
  const html = generateEmailHTML({
    title: 'Réinitialisation du mot de passe',
    text: 'Cliquez sur le bouton ci-dessous pour définir un nouveau mot de passe.',
    buttonText: 'Réinitialiser mon mot de passe',
    buttonUrl: link,
  });

  await sendMail(email, 'Réinitialisation de votre mot de passe', html);
}
