import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prenom, nom, email, telephone, etablissement, message } = body;

    if (!prenom || !nom || !email || !message) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
    }

    // Persist to Supabase
    const { error: dbError } = await getSupabase().from("contact_leads").insert({
      prenom,
      nom,
      email,
      telephone: telephone || null,
      etablissement: etablissement || null,
      message,
    });
    if (dbError) console.error("[contact] Supabase insert failed:", dbError.message);

    // Forward to contact@speakli.fr via Resend
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "formulaire@speakli.fr",
          to: "contact@speakli.fr",
          subject: `Nouveau message de ${prenom} ${nom}`,
          text: `Prénom: ${prenom}\nNom: ${nom}\nEmail: ${email}\nTéléphone: ${telephone || "—"}\nÉtablissement: ${etablissement || "—"}\n\n${message}`,
          reply_to: email,
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
