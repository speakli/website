import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      lits, nbAS, nbIDE, logiciel, support,
      tempsTrace, pmpActuel, pmpCible,
      roi,
    } = body;

    if (!email) {
      return NextResponse.json({ error: "Email requis." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const text = `
Bonjour,

Voici les résultats de votre simulation ROI Speakli :

VOTRE ÉTABLISSEMENT
-------------------
Nombre de lits     : ${lits}
Aides-soignants    : ${nbAS}
Infirmiers (IDE)   : ${nbIDE}
Logiciel DUI       : ${logiciel}
Support utilisé    : ${support}
PMP actuel         : ${pmpActuel} pts
PMP cible          : ${pmpCible} pts
Temps de traçage   : ${tempsTrace} h/soignant/jour

RÉSULTATS ESTIMÉS
-----------------
Valeur du temps libéré   : ${roi.val_an} €/an
Gain de dotation GMPS    : ${roi.gain_dotation} €/an
ROI TOTAL ESTIMÉ         : ${roi.roi_total} €/an

Ces résultats sont des estimations basées sur les données que vous avez fournies.
Pour une analyse personnalisée et un accompagnement sur les financements disponibles, réservez une démo avec notre équipe.

👉 https://calendly.com/ruben-speakli/30min

L'équipe Speakli
contact@speakli.fr
      `.trim();

      await Promise.all([
        // Send to the visitor
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "resultats@speakli.fr",
            to: email,
            subject: "Vos résultats ROI Speakli",
            text,
          }),
        }),
        // Notify Speakli team
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "simulateur@speakli.fr",
            to: "contact@speakli.fr",
            subject: `Nouveau calcul ROI — ${email}`,
            text: `Email prospect : ${email}\n\n` + text,
          }),
        }),
      ]);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
