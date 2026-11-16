import { MetadataRoute } from "next";

// Moteurs de recherche et moteurs de réponse IA autorisés explicitement, pour que Speakli
// puisse être cité dans ChatGPT, Perplexity, Claude, Gemini / AI Overviews et Copilot.
// /_next/ reste accessible : Google en a besoin pour afficher les pages (CSS, JS).
const AI_BOTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "PerplexityBot", "Perplexity-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "Google-Extended", "Applebot-Extended", "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_BOTS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: "https://www.speakli.fr/sitemap.xml",
    host: "https://www.speakli.fr",
  };
}
