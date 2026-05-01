import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation — Speakli",
  description:
    "Conditions Générales d'Utilisation de Speakli (SAS CTSUR) — modalités d'accès et d'utilisation de l'assistant vocal IA pour établissements médico-sociaux.",
};

const SECTIONS = [
  {
    id: "objet",
    title: "Objet",
    content: (
      <p>
        Les présentes Conditions Générales d&apos;Utilisation (ci-après « CGU ») régissent
        l&apos;accès et l&apos;utilisation de la plateforme Speakli, éditée par{" "}
        <strong>SAS CTSUR</strong> (ci-après « Speakli »), 92200 Neuilly-sur-Seine, France.
        Speakli est un assistant vocal à intelligence artificielle conçu pour les
        professionnels de santé exerçant en établissements médico-sociaux (EHPAD, USLD,
        résidences services seniors, SSIAD, etc.). Il permet la dictée vocale et la
        structuration de la traçabilité soignante, comptes-rendus et observations
        cliniques, avec intégration dans les logiciels métiers (DUI, SIS).
      </p>
    ),
  },
  {
    id: "acceptation",
    title: "Acceptation des CGU",
    content: (
      <p>
        L&apos;accès et l&apos;utilisation du service Speakli impliquent l&apos;acceptation
        pleine et entière des présentes CGU. En accédant à la plateforme, en soumettant un
        formulaire de contact ou de demande de démonstration, ou en utilisant le service à
        titre d&apos;essai ou dans le cadre d&apos;un contrat, l&apos;utilisateur reconnaît
        avoir lu, compris et accepté sans réserve les présentes CGU. Si vous n&apos;acceptez
        pas ces conditions, vous êtes invité à ne pas utiliser le service.
      </p>
    ),
  },
  {
    id: "acces",
    title: "Accès au service",
    content: (
      <>
        <p className="mb-4">
          L&apos;accès à Speakli est réservé aux établissements et professionnels de santé
          ayant conclu un contrat d&apos;abonnement avec Speakli, ou bénéficiant d&apos;un
          accès de démonstration accordé par nos équipes. L&apos;utilisation du service
          nécessite :
        </p>
        <ul className="list-none flex flex-col gap-2 mb-4">
          {[
            "La création d'un compte utilisateur rattaché à l'établissement client",
            "Un appareil compatible (smartphone, tablette ou terminal professionnel) disposant d'un accès à Internet",
            "Un microphone fonctionnel pour les fonctionnalités de dictée vocale",
            "L'activation des autorisations nécessaires (microphone, notifications) sur l'appareil utilisé",
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
          Speakli se réserve le droit de refuser l&apos;accès à toute personne ne remplissant
          pas les conditions d&apos;éligibilité ou dont l&apos;usage serait contraire aux
          présentes CGU.
        </p>
      </>
    ),
  },
  {
    id: "description",
    title: "Description du service",
    content: (
      <>
        <p className="mb-4">
          Speakli met à disposition des équipes soignantes les fonctionnalités suivantes :
        </p>
        <ul className="list-none flex flex-col gap-2 mb-4">
          {[
            "Dictée vocale en temps réel : enregistrement et transcription instantanée des observations soignantes, directement au chevet du résident",
            "Traçabilité soignante complète : structuration automatique et horodatée des transmissions, actes de soin, constantes, événements cliniques et observations quotidiennes",
            "Intégration logicielle : synchronisation avec les DUI et SIS de l'établissement pour une traçabilité continue sans ressaisie",
            "Tableau de bord de pilotage : suivi de l'activité de traçabilité en temps réel, à destination des cadres de santé et des directions d'établissement",
            "Sécurité et conformité : hébergement certifié HDS, chiffrement de bout en bout, journalisation et traçabilité des accès aux données",
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
          Le service est fourni en mode SaaS (Software as a Service). Speakli se réserve le
          droit de faire évoluer les fonctionnalités disponibles, d&apos;en ajouter de
          nouvelles ou d&apos;en modifier certaines, dans le respect des engagements contractuels
          pris envers les établissements clients.
        </p>
      </>
    ),
  },
  {
    id: "obligations",
    title: "Obligations de l'utilisateur",
    content: (
      <>
        <p className="mb-4">
          L&apos;utilisateur s&apos;engage à utiliser Speakli de manière conforme à sa
          destination et dans le respect des lois et réglementations applicables. Il est
          notamment interdit de :
        </p>
        <ul className="list-none flex flex-col gap-2 mb-4">
          {[
            "Utiliser le service à des fins autres que la documentation et la traçabilité des soins",
            "Partager ses identifiants de connexion avec des tiers non autorisés",
            "Tenter de contourner les mesures de sécurité ou d'accéder à des données qui ne lui sont pas destinées",
            "Reproduire, modifier, distribuer ou exploiter le service ou son contenu sans autorisation écrite de Speakli",
            "Introduire des virus, programmes malveillants ou tout code susceptible d'altérer le fonctionnement du service",
            "Utiliser le service d'une manière susceptible de porter atteinte aux droits de tiers ou à la réputation de Speakli",
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
          L&apos;utilisateur est responsable de la confidentialité de ses identifiants. Toute
          utilisation du service effectuée depuis son compte est réputée avoir été réalisée par
          lui. En cas de perte ou de compromission de ses accès, il doit en informer
          immédiatement Speakli.
        </p>
      </>
    ),
  },
  {
    id: "donnees-sante",
    title: "Données de santé et RGPD",
    content: (
      <>
        <p className="mb-5">
          Dans le cadre de l&apos;utilisation du service, des enregistrements vocaux sont
          captés localement sur l&apos;appareil du soignant à des fins de transcription.{" "}
          <strong>
            Speakli ne conserve aucun fichier audio après traitement.
          </strong>{" "}
          Le flux vocal suit le cycle suivant, sans exception :
        </p>

        {/* Pipeline vocal → traitement → suppression */}
        <div className="flex items-stretch gap-0 mb-6 rounded-xl overflow-hidden border" style={{ borderColor: "var(--sp-100)" }}>
          {[
            { step: "1", label: "Capture vocale", desc: "L'audio est capté sur l'appareil du soignant" },
            { step: "2", label: "Traitement IA", desc: "Transcription et structuration en texte soignant" },
            { step: "3", label: "Suppression immédiate", desc: "Le fichier audio est définitivement supprimé" },
          ].map(({ step, label, desc }, i) => (
            <div
              key={step}
              className="flex-1 flex flex-col items-center text-center p-4 relative"
              style={{ background: i === 2 ? "var(--sp-50)" : "#fff" }}
            >
              {i > 0 && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-px text-lg font-light select-none"
                  style={{ color: "var(--sp-200)" }}
                >
                  →
                </span>
              )}
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold mb-2"
                style={{ backgroundColor: i === 2 ? "var(--sp-500)" : "var(--sp-100)", color: i === 2 ? "#fff" : "var(--sp-500)" }}
              >
                {step}
              </span>
              <p className="text-xs font-bold mb-1" style={{ color: "var(--sp-900)" }}>{label}</p>
              <p className="text-xs leading-snug" style={{ color: "#6b7280" }}>{desc}</p>
            </div>
          ))}
        </div>

        <p className="mb-4">
          Seule la transcription textuelle structurée est transmise au DUI de
          l&apos;établissement et stockée sur les infrastructures certifiées{" "}
          <strong>HDS</strong> (Hébergement de Données de Santé), conformément à
          l&apos;arrêté du 26 avril 2024. Aucun vocal n&apos;est conservé,
          transmis à des tiers, ni utilisé à des fins d&apos;entraînement de modèles IA.
        </p>
        <p>
          L&apos;établissement client agit en qualité de responsable de traitement pour
          les données de ses résidents ; Speakli intervient en qualité de sous-traitant au
          sens de l&apos;article 28 du RGPD. Les modalités de traitement des données
          personnelles des utilisateurs (professionnels de santé, directions) sont
          détaillées dans notre{" "}
          <Link
            href="/politique-de-confidentialite"
            className="underline underline-offset-2 font-semibold transition-opacity hover:opacity-70"
            style={{ color: "var(--sp-500)" }}
          >
            Politique de confidentialité
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: "propriete-intellectuelle",
    title: "Propriété intellectuelle",
    content: (
      <p>
        L&apos;ensemble des éléments constituant le service Speakli — logiciel, algorithmes,
        interfaces, bases de données, marques, logos, textes et documentation — sont la
        propriété exclusive de SAS CTSUR et sont protégés par le droit de la propriété
        intellectuelle français et international. L&apos;accès au service ne confère à
        l&apos;utilisateur aucun droit de propriété sur ces éléments. Toute reproduction,
        représentation, adaptation ou exploitation non autorisée est strictement interdite et
        pourra faire l&apos;objet de poursuites judiciaires.
      </p>
    ),
  },
  {
    id: "disponibilite",
    title: "Disponibilité du service",
    content: (
      <p>
        Speakli s&apos;engage à mettre tout en œuvre pour assurer la continuité et la qualité
        du service. Des interruptions ponctuelles peuvent toutefois survenir pour des
        opérations de maintenance, des mises à jour ou en raison de circonstances
        indépendantes de notre volonté (incident réseau, force majeure). Speakli informera les
        établissements clients avec un préavis raisonnable en cas de maintenance planifiée. Les
        niveaux de disponibilité garantis sont précisés dans les contrats d&apos;abonnement
        conclus avec chaque établissement.
      </p>
    ),
  },
  {
    id: "responsabilite",
    title: "Limitation de responsabilité",
    content: (
      <>
        <p className="mb-4">
          Speakli apporte le plus grand soin au développement et à la maintenance de son
          service. Toutefois, sa responsabilité ne saurait être engagée dans les cas suivants :
        </p>
        <ul className="list-none flex flex-col gap-2 mb-4">
          {[
            "Utilisation du service non conforme aux présentes CGU ou aux préconisations de Speakli",
            "Interruption du service due à un tiers (opérateur réseau, hébergeur) ou à un cas de force majeure",
            "Perte de données résultant d'une défaillance du système d'information de l'établissement",
            "Décision médicale ou soignante prise sur la base d'une transcription erronée — le service est un outil d'aide à la documentation, non un dispositif médical au sens de la réglementation européenne",
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
          En tout état de cause, la responsabilité de Speakli est limitée aux dommages directs
          et ne saurait excéder les sommes effectivement versées par l&apos;établissement
          client au titre de l&apos;abonnement au cours des douze derniers mois précédant le
          sinistre.
        </p>
      </>
    ),
  },
  {
    id: "modifications",
    title: "Modification des CGU",
    content: (
      <p>
        Speakli se réserve le droit de modifier les présentes CGU à tout moment, notamment
        pour tenir compte des évolutions légales, réglementaires ou fonctionnelles du service.
        Les utilisateurs seront informés de toute modification significative par email ou via
        une notification dans l&apos;interface. La poursuite de l&apos;utilisation du service
        après notification vaut acceptation des nouvelles CGU. La date de dernière mise à jour
        est indiquée en bas de page.
      </p>
    ),
  },
  {
    id: "droit-applicable",
    title: "Droit applicable et juridiction",
    content: (
      <p>
        Les présentes CGU sont soumises au <strong>droit français</strong>. En cas de litige
        relatif à l&apos;interprétation ou à l&apos;exécution des présentes CGU, les parties
        s&apos;efforceront de trouver une solution amiable avant tout recours judiciaire. À
        défaut, les tribunaux compétents du ressort de{" "}
        <strong>Paris</strong> seront seuls compétents.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        Pour toute question relative aux présentes CGU ou à l&apos;utilisation du service,
        vous pouvez contacter Speakli à l&apos;adresse suivante :{" "}
        <a
          href="mailto:contact@speakli.fr"
          className="underline underline-offset-2 font-semibold transition-opacity hover:opacity-70"
          style={{ color: "var(--sp-500)" }}
        >
          contact@speakli.fr
        </a>
        . Pour toute question spécifiquement liée aux données personnelles, référez-vous à
        notre{" "}
        <Link
          href="/politique-de-confidentialite"
          className="underline underline-offset-2 font-semibold transition-opacity hover:opacity-70"
          style={{ color: "var(--sp-500)" }}
        >
          Politique de confidentialité
        </Link>{" "}
        et contactez{" "}
        <a
          href="mailto:rgpd@speakli.fr"
          className="underline underline-offset-2 font-semibold transition-opacity hover:opacity-70"
          style={{ color: "var(--sp-500)" }}
        >
          rgpd@speakli.fr
        </a>
        .
      </p>
    ),
  },
];

export default function CGUPage() {
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
              <span style={{ color: "var(--sp-900)" }}>
                Conditions Générales d&apos;Utilisation
              </span>
            </nav>

            <p
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--sp-500)" }}
            >
              Conditions d&apos;utilisation
            </p>
            <h1
              className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4"
              style={{ color: "var(--sp-900)" }}
            >
              Conditions Générales d&apos;Utilisation
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
                Une question sur nos conditions d&apos;utilisation&nbsp;?
              </p>
              <p className="text-sm mb-6" style={{ color: "#4A5568" }}>
                Notre équipe est disponible pour répondre à toute demande relative à
                l&apos;accès ou à l&apos;utilisation du service Speakli.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:contact@speakli.fr"
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
                  contact@speakli.fr
                </a>
                <a
                  href="https://calendly.com/ruben-speakli/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white font-semibold text-sm px-5 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{ backgroundColor: "var(--sp-500)" }}
                >
                  Réserver une démo
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
