import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prenom, nom, email, telephone, message } = body;

    if (!prenom || !nom || !email || !message) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
    }

    // Forward to contact@speakli.fr via Resend (configure RESEND_API_KEY in env)
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "formulaire@speakli.fr",
          to: "contact@speakli.fr",
          subject: `Nouveau message de ${prenom} ${nom}`,
          text: `Prénom: ${prenom}\nNom: ${nom}\nEmail: ${email}\nTéléphone: ${telephone || "—"}\n\n${message}`,
          reply_to: email,
        }),
      });
    }

    // Always return success (graceful even without email service configured)
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
