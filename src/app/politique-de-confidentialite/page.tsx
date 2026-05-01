import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Speakli",
  description:
    "Politique de confidentialité de Speakli (SAS CTSUR) — traitement des données personnelles, droits RGPD, conservation et sécurité.",
};

const SECTIONS = [
  {
    id: "responsable",
    title: "Responsable du traitement",
    content: (
      <p>
        <strong>SAS CTSUR (Speakli)</strong><br />
        92200, Neuilly-sur-Seine, France<br />
        Email&nbsp;:{" "}
        <a
          href="mailto:rgpd@speakli.fr"
          className="underline underline-offset-2 transition-opacity hover:opacity-70"
          style={{ color: "var(--sp-500)" }}
        >
          rgpd@speakli.fr
        </a>
      </p>
    ),
  },
  {
    id: "donnees",
    title: "Données collectées",
    content: (
      <>
        <p className="mb-4">
          Nous collectons les données personnelles que vous nous transmettez volontairement via
          nos formulaires de contact ou lors de nos échanges commerciaux :
        </p>
        <ul className="list-none flex flex-col gap-2">
          {[
            "Nom et prénom",
            "Adresse email professionnelle",
            "Numéro de téléphone",
            "Nom de la société et fonction",
            "Type et taille de l'établissement (EHPAD, USLD, résidence services, etc.)",
            "Nombre de lits et capacité d'accueil",
            "Logiciel métier utilisé (DUI, SIS)",
            "Site web de l'établissement",
            "Données saisies dans le calculateur de gains (GMP, PMP, nombre de résidents, ETP soignants)",
            "Message libre saisi dans le formulaire de contact",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: "var(--sp-500)" }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "finalites",
    title: "Finalités du traitement",
    content: (
      <>
        <p className="mb-4">Vos données sont utilisées pour :</p>
        <ul className="list-none flex flex-col gap-2">
          {[
            "Répondre à vos demandes de contact et de démonstration",
            "Vous proposer un accompagnement adapté à votre établissement",
            "Organiser des rendez-vous et démonstrations avec nos équipes",
            "Vous adresser des informations sur nos solutions (sur votre accord)",
            "Améliorer la qualité de nos échanges et de notre offre commerciale",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: "var(--sp-500)" }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "base-legale",
    title: "Base légale",
    content: (
      <p>
        Le traitement de vos données est fondé sur votre{" "}
        <strong>consentement</strong> (soumission volontaire du formulaire) et sur
        l&apos;exécution de <strong>mesures précontractuelles</strong> prises à votre demande
        (article 6.1.b du RGPD). Lorsque vous nous accordez votre accord pour recevoir des
        communications, le traitement est fondé sur votre consentement explicite (article
        6.1.a du RGPD).
      </p>
    ),
  },
  {
    id: "conservation",
    title: "Durée de conservation",
    content: (
      <p>
        Vos données sont conservées pendant une durée maximale de{" "}
        <strong>3 ans</strong> à compter de votre dernier contact avec nous, ou jusqu&apos;à
        l&apos;exercice de votre droit de suppression. En cas de relation commerciale établie,
        les données relatives à la relation contractuelle sont conservées pendant la durée
        légale applicable (5 ans pour les données de facturation).
      </p>
    ),
  },
  {
    id: "partage",
    title: "Partage des données",
    content: (
      <p>
        Vos données ne sont <strong>pas vendues ni cédées à des tiers</strong>. Elles peuvent
        être transmises à nos prestataires techniques (hébergeur du site, outils CRM,
        solutions d&apos;agenda) dans le strict cadre de leur mission et sous contrat de
        sous-traitance conforme au RGPD. Tous nos prestataires sont soumis aux mêmes
        exigences de confidentialité que nous.
      </p>
    ),
  },
  {
    id: "securite",
    title: "Sécurité des données",
    content: (
      <p>
        Speakli applique des mesures techniques et organisationnelles adaptées pour protéger
        vos données : chiffrement en transit (TLS), hébergement du site sur l&apos;infrastructure{" "}
        <strong>Vercel</strong> (certifiée SOC 2 Type II), accès restreint aux seules personnes
        habilitées, et journalisation des accès. Les données de santé collectées dans le cadre
        de l&apos;application Speakli relèvent d&apos;une infrastructure distincte et ne sont
        pas concernées par la présente politique du site.
      </p>
    ),
  },
  {
    id: "droits",
    title: "Vos droits",
    content: (
      <>
        <p className="mb-4">
          Conformément au RGPD, vous disposez des droits suivants sur vos données
          personnelles :
        </p>
        <ul className="list-none flex flex-col gap-2 mb-4">
          {[
            "Droit d'accès — obtenir une copie de vos données",
            "Droit de rectification — corriger des données inexactes",
            "Droit à l'effacement — demander la suppression de vos données",
            "Droit à la portabilité — recevoir vos données dans un format structuré",
            "Droit d'opposition — vous opposer à un traitement fondé sur l'intérêt légitime",
            "Droit à la limitation — restreindre le traitement dans certains cas",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: "var(--sp-500)" }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          Pour exercer ces droits, contactez-nous à :{" "}
          <a
            href="mailto:rgpd@speakli.fr"
            className="underline underline-offset-2 transition-opacity hover:opacity-70 font-semibold"
            style={{ color: "var(--sp-500)" }}
          >
            rgpd@speakli.fr
          </a>
          . Nous nous engageons à vous répondre dans un délai d&apos;un mois. En cas de
          réponse insatisfaisante, vous pouvez introduire une réclamation auprès de la{" "}
          <strong>CNIL</strong> (Commission Nationale de l&apos;Informatique et des Libertés —
          cnil.fr).
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <p>
        Ce site utilise uniquement des cookies <strong>strictement nécessaires</strong> à son
        fonctionnement technique (maintien de session, préférences d&apos;affichage). Aucun
        cookie publicitaire, de suivi comportemental ou de profilage n&apos;est utilisé. Vous
        pouvez à tout moment désactiver les cookies dans les paramètres de votre navigateur,
        ce qui peut affecter certaines fonctionnalités du site.
      </p>
    ),
  },
  {
    id: "modifications",
    title: "Modifications de cette politique",
    content: (
      <p>
        Speakli se réserve le droit de mettre à jour cette politique de confidentialité pour
        refléter les évolutions légales ou de nos pratiques. La date de dernière mise à jour
        est indiquée en bas de page. Nous vous invitons à consulter régulièrement cette page.
      </p>
    ),
  },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "80px" }}>
        {/* Hero */}
        <section
          className="pt-16 pb-12 px-6 border-b"
          style={{
            background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)",
            borderColor: "var(--sp-100)",
          }}
        >
          <div className="max-w-3xl mx-auto">
            <nav
              className="flex items-center gap-2 text-xs font-medium mb-8"
              aria-label="Fil d'Ariane"
            >
              <Link
                href="/"
                className="transition-opacity hover:opacity-75"
                style={{ color: "var(--sp-500)" }}
              >
                Accueil
              </Link>
              <svg
                width="12"
                height="12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
                style={{ color: "rgba(0,40,120,0.3)" }}
              >
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ color: "var(--sp-900)" }}>Politique de confidentialité</span>
            </nav>

            <p
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--sp-500)" }}
            >
              RGPD &amp; Données personnelles
            </p>
            <h1
              className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4"
              style={{ color: "var(--sp-900)" }}
            >
              Politique de confidentialité
            </h1>
            <p className="text-base font-medium" style={{ color: "#4A5568" }}>
              Dernière mise à jour : avril 2026 — SAS CTSUR (Speakli), 92200 France
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-6" style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}>
          <div className="max-w-3xl mx-auto">
            {/* Table of contents */}
            <nav
              className="rounded-2xl p-6 mb-12"
              style={{
                background: "var(--sp-50)",
                border: "1px solid var(--sp-100)",
              }}
              aria-label="Sommaire"
            >
              <p
                className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: "var(--sp-500)" }}
              >
                Sommaire
              </p>
              <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                {SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-sm font-medium transition-opacity hover:opacity-70"
                      style={{ color: "var(--sp-700)" }}
                    >
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Sections */}
            <div className="flex flex-col gap-12">
              {SECTIONS.map((s, i) => (
                <div key={s.id} id={s.id} className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold"
                      style={{ backgroundColor: "var(--sp-500)", color: "#fff" }}
                    >
                      {i + 1}
                    </span>
                    <h2
                      className="text-xl font-extrabold tracking-tight"
                      style={{ color: "var(--sp-900)" }}
                    >
                      {s.title}
                    </h2>
                  </div>
                  <div
                    className="text-base leading-relaxed pl-10"
                    style={{ color: "#4A5568" }}
                  >
                    {s.content}
                  </div>
                  {i < SECTIONS.length - 1 && (
                    <div
                      className="mt-12 border-b"
                      style={{ borderColor: "var(--sp-100)" }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Contact block */}
            <div
              className="mt-16 rounded-2xl px-8 py-8 text-center"
              style={{ background: "var(--sp-50)", border: "1px solid var(--sp-100)" }}
            >
              <p className="font-bold text-base mb-2" style={{ color: "var(--sp-900)" }}>
                Une question sur vos données&nbsp;?
              </p>
              <p className="text-sm mb-4" style={{ color: "#4A5568" }}>
                Notre référent RGPD est disponible pour répondre à toute demande relative à
                vos droits ou au traitement de vos données personnelles.
              </p>
              <a
                href="mailto:rgpd@speakli.fr"
                className="inline-flex items-center gap-2 font-semibold text-sm px-5 py-3 rounded-xl border transition-all hover:bg-white"
                style={{ borderColor: "var(--sp-200)", color: "var(--sp-500)" }}
              >
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                rgpd@speakli.fr
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
