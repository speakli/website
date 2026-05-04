import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR").format(Math.round(n)) + " €";
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email, civility, firstName, lastName,
      lits, nbAS, nbIDE, logiciel, support,
      tempsTrace, pmpActuel, pmpCible,
      roi,
    } = body;

    if (!email) {
      return NextResponse.json({ error: "Email requis." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[roi] RESEND_API_KEY manquante — email non envoyé");
      return NextResponse.json({ error: "Configuration email manquante." }, { status: 500 });
    }

    const salutation = civility && firstName && lastName
      ? `${civility} ${firstName} ${lastName}`
      : null;

    // Persist to Supabase
    const { error: dbError } = await getSupabase().from("roi_simulations").insert({
      email,
      civility: civility || null,
      first_name: firstName || null,
      last_name: lastName || null,
      lits,
      nb_as: nbAS,
      nb_ide: nbIDE,
      logiciel: logiciel || null,
      support: support || null,
      temps_trace: tempsTrace,
      pmp_actuel: pmpActuel,
      pmp_cible: pmpCible,
      val_an: roi.val_an,
      gain_dotation: roi.gain_dotation,
      roi_total: roi.roi_total,
    });
    if (dbError) console.error("[roi] Supabase insert failed:", dbError.message);

    const greetingLine = salutation ? `Bonjour ${salutation},` : "Bonjour,";

    const htmlBody = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f8ff;font-family:Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f8ff;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,20,80,0.08);">

        <!-- Header -->
        <tr><td style="background:#0b1c38;padding:28px 40px;">
          <span style="font-size:22px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">Speak<span style="color:#60aaff;">li</span></span>
          <p style="margin:6px 0 0;font-size:11px;color:rgba(255,255,255,0.55);">Votre rapport ROI confidentiel</p>
        </td></tr>

        <!-- Greeting -->
        <tr><td style="padding:36px 40px 20px;">
          <p style="font-size:16px;font-weight:700;color:#1a2e49;margin:0 0 8px;">${greetingLine}</p>
          <p style="font-size:14px;color:#4a5568;line-height:1.7;margin:0;">
            Suite à votre simulation sur <strong>speakli.fr</strong>, voici votre rapport personnalisé d'estimation de retour sur investissement.
            Vous trouverez en pièce jointe votre rapport PDF complet.
          </p>
        </td></tr>

        <!-- KPI Cards -->
        <tr><td style="padding:0 40px 28px;">
          <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#007aff;margin:0 0 16px;">Résultats estimés</p>
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td width="32%" style="background:#eaf3ff;border-radius:12px;padding:18px;text-align:center;">
                <p style="font-size:22px;font-weight:800;color:#007aff;margin:0 0 4px;">${fmt(roi.val_an)}</p>
                <p style="font-size:11px;color:#718096;margin:0;">Valeur du temps libéré / an</p>
              </td>
              <td width="4%"></td>
              <td width="32%" style="background:#eaf3ff;border-radius:12px;padding:18px;text-align:center;">
                <p style="font-size:22px;font-weight:800;color:#007aff;margin:0 0 4px;">${fmt(roi.gain_dotation)}</p>
                <p style="font-size:11px;color:#718096;margin:0;">Gain de dotation GMPS / an</p>
              </td>
              <td width="4%"></td>
              <td width="32%" style="background:#007aff;border-radius:12px;padding:18px;text-align:center;">
                <p style="font-size:22px;font-weight:800;color:#ffffff;margin:0 0 4px;">${fmt(roi.roi_total)}</p>
                <p style="font-size:11px;color:rgba(255,255,255,0.8);margin:0;">ROI TOTAL estimé / an</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Params -->
        <tr><td style="padding:0 40px 28px;">
          <p style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#007aff;margin:0 0 16px;">Paramètres de votre établissement</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;">
            ${[
              ["Nombre de lits", `${lits} lits`],
              ["Aides-soignants", `${nbAS} ETP`],
              ["Infirmiers (IDE)", `${nbIDE} ETP`],
              ["Logiciel DUI", logiciel],
              ["Temps de traçage", `${tempsTrace} h / soignant / jour`],
              ["PMP actuel", `${pmpActuel} pts`],
              ["PMP cible avec Speakli", `${pmpCible} pts`],
            ].map(([label, value]) => `
            <tr style="border-bottom:1px solid #f0f4ff;">
              <td style="padding:8px 0;color:#718096;">${label}</td>
              <td style="padding:8px 0;color:#1a2e49;font-weight:700;text-align:right;">${value}</td>
            </tr>`).join("")}
          </table>
        </td></tr>

        <!-- CTA -->
        <tr><td style="padding:0 40px 36px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b1c38;border-radius:14px;padding:28px;text-align:center;">
            <tr><td>
              <p style="font-size:16px;font-weight:800;color:#ffffff;margin:0 0 8px;">Passez à l'étape suivante</p>
              <p style="font-size:13px;color:rgba(255,255,255,0.65);margin:0 0 20px;line-height:1.6;">
                Discutons de votre établissement en détail.<br>Réservez une démo gratuite de 30 minutes.
              </p>
              <a href="https://calendly.com/ruben-speakli/30min" style="display:inline-block;background:#007aff;color:#ffffff;font-weight:700;font-size:14px;padding:14px 28px;border-radius:10px;text-decoration:none;">
                Réserver ma démo gratuite →
              </a>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 40px;border-top:1px solid #e2e8f0;">
          <p style="font-size:11px;color:#a0aec0;margin:0;text-align:center;">
            SAS CTSUR (Speakli) · contact@speakli.fr · speakli.fr<br>
            Ce rapport est confidentiel et établi à titre indicatif.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`.trim();

    // Generate PDF attachment
    let attachments: { filename: string; content: string }[] = [];
    try {
      const { generatePdfBuffer } = await import("@/lib/roi-pdf");
      const buffer = await generatePdfBuffer({
        civility: civility || "M.",
        firstName: firstName || "",
        lastName: lastName || "",
        formData: { lits, nbAS, nbIDE, logiciel, support, tempsTrace, pmpActuel, pmpCible },
        roi,
      });
      attachments = [{
        filename: "simulation-roi-speakli.pdf",
        content: Buffer.from(buffer).toString("base64"),
      }];
    } catch (pdfErr) {
      console.error("PDF generation failed:", pdfErr);
    }

    const visitorPayload: Record<string, unknown> = {
      from: "resultats@speakli.fr",
      to: email,
      subject: "Votre rapport ROI Speakli",
      html: htmlBody,
    };
    if (attachments.length > 0) {
      visitorPayload.attachments = attachments;
    }

    const [visitorRes, teamRes] = await Promise.all([
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify(visitorPayload),
      }),
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "simulateur@speakli.fr",
          to: "contact@speakli.fr",
          subject: `Nouveau calcul ROI — ${salutation ?? email}`,
          text: [
            `Contact : ${salutation ?? "inconnu"} <${email}>`,
            `Lits: ${lits} | AS: ${nbAS} | IDE: ${nbIDE} | DUI: ${logiciel}`,
            `PMP actuel: ${pmpActuel} → cible: ${pmpCible}`,
            `ROI total estimé : ${fmt(roi.roi_total)} / an`,
          ].join("\n"),
        }),
      }),
    ]);

    if (!visitorRes.ok) {
      const errBody = await visitorRes.json().catch(() => ({}));
      console.error("[roi] Resend visitor email failed:", visitorRes.status, JSON.stringify(errBody));
      return NextResponse.json({ error: "Échec envoi email." }, { status: 500 });
    }

    const teamBody = await teamRes.json().catch(() => ({}));
    if (!teamRes.ok) {
      console.error("[roi] Resend team email failed:", teamRes.status, JSON.stringify(teamBody));
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
