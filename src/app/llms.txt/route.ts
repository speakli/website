import { translations } from "@/lib/translations";
import { BLOG_ARTICLES } from "@/lib/blog-articles";

/*
 * /llms.txt (https://llmstxt.org) : fiche de synthèse en Markdown pour les moteurs de
 * réponse IA (ChatGPT, Perplexity, Claude, Gemini, Copilot). Générée à partir des textes
 * affichés sur le site (produits, résultats, FAQ, articles), elle ne peut pas diverger.
 */

const BASE_URL = "https://www.speakli.fr";
const DEMO_URL = "https://meetings-eu1.hubspot.com/ruben-weinstein";

export const dynamic = "force-static";

export function GET() {
  const t = translations.fr;
  const p = t.products;

  const list = (items: { title: string; text: string }[]) => items.map(i => `- **${i.title}** : ${i.text}`).join("\n");

  const body = `# Speakli

> Speakli est un assistant vocal IA pour les soignants des EHPAD et des établissements médico-sociaux. Au chevet du résident, le soignant décrit à voix haute ce qu'il a observé et réalisé ; Speakli rédige la documentation de soins (transmissions ciblées au format DAR, signature du plan de soins, relevés de constantes) et l'intègre au dossier de soins informatisé (DUI) de l'établissement, après validation par le soignant.

## Speakli en bref

- Éditeur : Speakli (SAS CTSUR), Paris, France.
- Pour qui : directions d'EHPAD et de groupes d'EHPAD, IDEC et cadres de santé, médecins coordonnateurs, soignants (aides-soignants, infirmiers, AES).
- Déploiement : plus de 50 établissements équipés en France.
- Interopérabilité : partenaire officiel d'Orisha ; Speakli écrit directement dans NETSoins et NETVie.
- Sécurité : hébergement certifié HDS (Hébergeur de Données de Santé), conformité RGPD, données chiffrées, aucun enregistrement vocal conservé après transcription, pas d'entraînement de l'IA sur les données des résidents.
- Un humain dans la boucle : rien n'entre dans le dossier du résident sans la validation du soignant.
- Tarif : sur devis, après une démonstration de 30 minutes.

## ${p.assistant_head.eyebrow} (pour les soignants)

${p.assistant_head.title} ${p.assistant_head.title_accent}

${list(p.assistant)}

## ${p.dashboard_head.eyebrow} (pour la direction et l'encadrement)

${p.dashboard_head.title} ${p.dashboard_head.title_accent}

${list(p.dashboard)}

## Résultats mesurés chez nos clients

${t.story.impact.cards.map(c => `- **${c.metric} ${c.metric_label}** (${c.org}) : ${c.title}. ${c.text}`).join("\n")}

## Questions fréquentes

${t.faq.items.map(i => `### ${i.question}\n\n${i.answer}`).join("\n\n")}

## Pages principales

- [Accueil](${BASE_URL}/) : présentation de l'assistant vocal IA et du tableau de pilotage
- [Logiciel de transmission EHPAD](${BASE_URL}/logiciel-transmission-ehpad) : transmissions ciblées, méthode DAR, intégration au DUI
- [Calculateur PATHOS](${BASE_URL}/roi) : estimation du gain de dotation soins (GMPS) pour un EHPAD
- [Ressources](${BASE_URL}/ressources) : articles sur la traçabilité, PATHOS/GMPS, l'IA en EHPAD, la conformité
- [Partenaires et soutiens](${BASE_URL}/qui-sommes-nous/partenaires-et-soutiens)

## Articles

${BLOG_ARTICLES.map(a => `- [${a.title}](${BASE_URL}/blog/${a.slug}) (${a.category}, ${a.date}) : ${a.excerpt}`).join("\n")}

## Contact

- Démonstration de 30 minutes : ${DEMO_URL}
- E-mail : contact@speakli.fr
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
