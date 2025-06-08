import nodemailer from 'nodemailer';

export function generateEmailHTML({
  title,
  text,
  buttonText,
  buttonUrl,
  footerText,
}: {
  title: string;
  text: string;
  buttonText: string;
  buttonUrl: string;
  footerText: string;
}) {
  return `
    <div style="background:#1a1a1a;color:#f0f0f0;padding:40px;font-family:sans-serif;max-width:600px;margin:auto;border-radius:12px;">
      <div style="text-align:center;margin-bottom:20px;">
        <img src="cid:logo" alt="Logo du tournoi" style="width:60px;height:auto;" />
      </div>

      <h1 style="font-size:24px;margin-bottom:20px;text-align:center;">${title}</h1>

      <p style="font-size:16px;margin-bottom:30px;text-align:center;">${text}</p>

      <div style="text-align:center;">
        <a href="${buttonUrl}" style="background:#e63946;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-size:16px;">
          ${buttonText}
        </a>
      </div>

      <p style="font-size:12px;color:#888;margin-top:40px;text-align:center;">
        ${footerText}
      </p>
    </div>
  `;
}

export async function sendMail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Tournoi" <no-reply@resend.dev>',
    to,
    subject,
    html,
    attachments: [
      {
        filename: 'logo.png',
        path: './public/assets/logos/VBlancCBlanc.png',
        cid: 'logo',
      },
    ],
  });
}

export async function sendEmailVerification(
  email: string,
  token: string,
  g: (key: string) => string,
) {
  const uRL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup/verify?token=${token}`;

  await sendMail(
    email,
    g('emailConfirmationSubject'),
    generateEmailHTML({
      title: g('emailConfirmationTitle'),
      text: g('emailConfirmationText'),
      buttonText: g('emailConfirmationButtonText'),
      buttonUrl: uRL,
      footerText: g('emailConfirmationFooter'),
    }),
  );
}

export async function sendPasswordResetEmail(
  email: string,
  link: string,
  g: (key: string) => string,
) {
  await sendMail(
    email,
    g('emailReinitializationSubject'),
    generateEmailHTML({
      title: g('emailReinitializationTitle'),
      text: g('emailReinitializationText'),
      buttonText: g('emailReinitializationButtonText'),
      buttonUrl: link,
      footerText: g('emailReinitializationFooter'),
    }),
  );
}
