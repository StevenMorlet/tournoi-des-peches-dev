const logoURL = `${process.env.NEXT_PUBLIC_BASE_URL}/assets/logos/VBlancCBlanc.png`;

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
  <div style="background:#111111;color:#f8f8f8;padding:40px;font-family:'Segoe UI',sans-serif;max-width:600px;margin:auto;border-radius:12px;">
    <div style="text-align:center;margin-bottom:30px;">
      <img src=${logoURL} alt="Logo du tournoi" style="width:80px;height:auto;" />
    </div>

    <h1 style="font-size:22px;margin-bottom:20px;text-align:center;">${title}</h1>

    <p style="font-size:15px;margin-bottom:30px;text-align:center;line-height:1.6;">${text}</p>

    <div style="text-align:center;margin-bottom:30px;">
      <a href="${buttonUrl}" style="background:#e63946;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">
        ${buttonText}
      </a>
    </div>

    <p style="font-size:11px;color:#888;text-align:center;">
      Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.
    </p>
  </div>
  `;
}
