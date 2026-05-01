import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mentions légales — Speakli",
  description:
    "Mentions légales de Speakli (SAS CTSUR) — éditeur du site, hébergement, propriété intellectuelle et responsabilité.",
};

export default function MentionsLegalesPage() {
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
              <span style={{ color: "var(--sp-900)" }}>Mentions légales</span>
            </nav>

            <p
              className="text-xs font-bold uppercase tracking-widest mb-4"
              style={{ color: "var(--sp-500)" }}
            >
              Informations légales
            </p>
            <h1
              className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4"
              style={{ color: "var(--sp-900)" }}
            >
              Mentions légales
            </h1>
            <p className="text-base font-medium" style={{ color: "#4A5568" }}>
              Dernière mise à jour : avril 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 px-6" style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}>
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col gap-12" style={{ color: "#4A5568" }}>

              {/* 1 — Éditeur */}
              <div id="editeur" className="scroll-mt-24">
                <h2 className="text-xl font-extrabold tracking-tight mb-5" style={{ color: "var(--sp-900)" }}>
                  Éditeur du site
                </h2>
                <p className="text-base leading-relaxed mb-3">
                  Le site <strong style={{ color: "var(--sp-900)" }}>speakli.fr</strong> est
                  édité par la société française{" "}
                  <strong style={{ color: "var(--sp-900)" }}>SAS CTSUR</strong>, société par
                  actions simplifiée au capital de{" "}
                  <strong style={{ color: "var(--sp-900)" }}>102 €</strong>, dont le siège
                  social est situé au{" "}
                  <strong style={{ color: "var(--sp-900)" }}>
                    92200 Neuilly-sur-Seine, France
                  </strong>
                  .
                </p>
                <p
                  className="text-sm p-4 rounded-xl mb-4"
                  style={{ background: "var(--sp-50)", border: "1px solid var(--sp-100)", color: "#6b7280" }}
                >
                  Les informations relatives au numéro d&apos;immatriculation au Registre du
                  Commerce et des Sociétés, au numéro de TVA intracommunautaire et à
                  l&apos;adresse complète du siège social seront mises à jour dès
                  finalisation de l&apos;immatriculation de la société.
                </p>
                <p className="text-base leading-relaxed mb-1">
                  SAS CTSUR peut être contactée :
                </p>
                <ul className="list-none flex flex-col gap-1.5 mt-2">
                  <li className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--sp-500)" }} />
                    <span>
                      Par email :{" "}
                      <a
                        href="mailto:contact@speakli.fr"
                        className="underline underline-offset-2 transition-opacity hover:opacity-70"
                        style={{ color: "var(--sp-500)" }}
                      >
                        contact@speakli.fr
                      </a>
                    </span>
                  </li>
                </ul>
                <p className="text-base leading-relaxed mt-4">
                  <strong style={{ color: "var(--sp-900)" }}>Ruben Weinstein</strong>,
                  représentant légal de SAS CTSUR, est le directeur de la publication.
                </p>
              </div>

              <div className="border-t" style={{ borderColor: "var(--sp-100)" }} />

              {/* 2 — Hébergement */}
              <div id="hebergement" className="scroll-mt-24">
                <h2 className="text-xl font-extrabold tracking-tight mb-5" style={{ color: "var(--sp-900)" }}>
                  Hébergeur du site
                </h2>
                <p className="text-base leading-relaxed mb-3">
                  Le site speakli.fr est hébergé par{" "}
                  <strong style={{ color: "var(--sp-900)" }}>Vercel Inc.</strong>, dont le
                  siège social est situé au 340 S Lemon Ave #4133, Walnut, CA 91789,
                  États-Unis.
                </p>
                <p className="text-base leading-relaxed">
                  L&apos;utilisation du site suppose l&apos;acceptation et le respect des
                  présentes mentions légales ainsi que des{" "}
                  <Link
                    href="/cgu"
                    className="underline underline-offset-2 font-semibold transition-opacity hover:opacity-70"
                    style={{ color: "var(--sp-500)" }}
                  >
                    Conditions Générales d&apos;Utilisation
                  </Link>{" "}
                  par l&apos;utilisateur.
                </p>
              </div>

              <div className="border-t" style={{ borderColor: "var(--sp-100)" }} />

              {/* 3 — Propriété intellectuelle */}
              <div id="propriete-intellectuelle" className="scroll-mt-24">
                <h2 className="text-xl font-extrabold tracking-tight mb-5" style={{ color: "var(--sp-900)" }}>
                  Propriété intellectuelle
                </h2>
                <p className="text-base leading-relaxed">
                  L&apos;ensemble des éléments présents sur ce site — textes, articles,
                  images, vidéos, logos, graphiques, mise en page, code source, etc. — est
                  la propriété exclusive de <strong style={{ color: "var(--sp-900)" }}>SAS CTSUR (Speakli)</strong>,
                  sauf mention contraire expresse. Toute reproduction, représentation,
                  modification, publication, transmission ou adaptation, totale ou partielle,
                  de ces éléments, par quelque procédé que ce soit et sans autorisation
                  écrite préalable de SAS CTSUR, est strictement interdite et constitue une
                  contrefaçon sanctionnée par le Code de la propriété intellectuelle.
                </p>
              </div>

              <div className="border-t" style={{ borderColor: "var(--sp-100)" }} />

              {/* 4 — Responsabilité */}
              <div id="responsabilite" className="scroll-mt-24">
                <h2 className="text-xl font-extrabold tracking-tight mb-5" style={{ color: "var(--sp-900)" }}>
                  Responsabilité
                </h2>
                <p className="text-base leading-relaxed">
                  SAS CTSUR met tout en œuvre pour fournir sur ce site des informations
                  fiables et à jour, sans toutefois pouvoir garantir leur exactitude, leur
                  exhaustivité ou leur actualité. Les contenus publiés — notamment les
                  articles thématiques à destination des professionnels du secteur
                  médico-social — sont fournis à titre informatif et ne constituent pas des
                  conseils médicaux, juridiques ou financiers. L&apos;utilisateur demeure
                  seul responsable de l&apos;usage qu&apos;il fait des informations
                  fournies. SAS CTSUR ne pourra en aucun cas être tenue responsable de
                  dommages directs ou indirects, de quelque nature que ce soit, résultant de
                  l&apos;utilisation ou de l&apos;impossibilité d&apos;utiliser ce site.
                </p>
              </div>

              <div className="border-t" style={{ borderColor: "var(--sp-100)" }} />

              {/* 5 — Données personnelles */}
              <div id="donnees" className="scroll-mt-24">
                <h2 className="text-xl font-extrabold tracking-tight mb-5" style={{ color: "var(--sp-900)" }}>
                  Données personnelles
                </h2>
                <p className="text-base leading-relaxed">
                  La collecte et le traitement des données personnelles des utilisateurs de
                  ce site sont régis par notre{" "}
                  <Link
                    href="/politique-de-confidentialite"
                    className="underline underline-offset-2 font-semibold transition-opacity hover:opacity-70"
                    style={{ color: "var(--sp-500)" }}
                  >
                    Politique de confidentialité
                  </Link>
                  , conformément au Règlement Général sur la Protection des Données (RGPD —
                  règlement UE 2016/679). Pour toute question relative à vos données,
                  contactez{" "}
                  <a
                    href="mailto:rgpd@speakli.fr"
                    className="underline underline-offset-2 font-semibold transition-opacity hover:opacity-70"
                    style={{ color: "var(--sp-500)" }}
                  >
                    rgpd@speakli.fr
                  </a>
                  .
                </p>
              </div>

              <div className="border-t" style={{ borderColor: "var(--sp-100)" }} />

              {/* 6 — Droit applicable */}
              <div id="droit-applicable" className="scroll-mt-24">
                <h2 className="text-xl font-extrabold tracking-tight mb-5" style={{ color: "var(--sp-900)" }}>
                  Droit applicable — Litiges
                </h2>
                <p className="text-base leading-relaxed">
                  Le présent site et les présentes mentions légales sont soumis au{" "}
                  <strong style={{ color: "var(--sp-900)" }}>droit français</strong>. En cas
                  de litige, compétence exclusive est attribuée aux juridictions relevant de
                  la <strong style={{ color: "var(--sp-900)" }}>Cour d&apos;appel de Paris</strong>,
                  sauf dispositions légales impératives contraires.
                </p>
              </div>

            </div>

            {/* Contact block */}
            <div
              className="mt-16 rounded-2xl px-8 py-8 text-center"
              style={{ background: "var(--sp-50)", border: "1px solid var(--sp-100)" }}
            >
              <p className="font-bold text-base mb-2" style={{ color: "var(--sp-900)" }}>
                Une question&nbsp;?
              </p>
              <p className="text-sm mb-6" style={{ color: "#4A5568" }}>
                Pour toute demande relative aux présentes mentions légales, contactez-nous.
              </p>
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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
