import Link from "next/link";

const DEMO_URL = "https://calendly.com/ruben-speakli/30min";

const DAR_EXAMPLE = [
  { label: "DONNÉES", text: "Résidente retrouvée au sol dans sa chambre, consciente, se plaignant de douleurs au poignet droit à 8/10." },
  { label: "ACTIONS", text: "Aide à se relever, installation au fauteuil, application de glace sur le poignet." },
  { label: "RÉSULTATS", text: "Résidente calme, poignet légèrement enflé, médecin prévenu." },
];

const FLOW_STEPS = [
  { label: "Dictée vocale", sublabel: "Le soignant dicte son observation à voix haute, au chevet du résident" },
  { label: "Transcription & structuration IA", sublabel: "Speakli transforme la voix en transmission structurée" },
  { label: "Validation soignant", sublabel: "Le professionnel relit et valide — l'humain reste toujours dans la boucle" },
  { label: "Synchronisation DUI", sublabel: "Intégration instantanée dans le dossier résident, zéro double saisie" },
];

const USE_CASES = [
  { title: "Observation de nuit", text: "« Mme Martin, nuit calme, pas d'agitation, petit-déjeuner pris en totalité » — dictée en quelques secondes, sans allumer un écran dans une chambre plongée dans le noir." },
  { title: "Chute en journée", text: "Circonstances, état du résident, actions immédiates : le soignant documente l'épisode à voix haute pendant que les détails sont encore frais, au lieu de les reconstituer de mémoire en fin de poste." },
  { title: "Constantes et refus de soins", text: "Température, SpO₂, refus alimentaire ou comportemental : chaque observation est captée au moment où elle se produit, puis structurée automatiquement dans la bonne rubrique du DUI." },
];

const CAREGIVER_BENEFITS = [
  "Moins de temps passé sur un écran en fin de service, plus de temps auprès des résidents",
  "Aucune observation oubliée grâce à la dictée au fil de l'eau",
  "Une transmission ciblée générée automatiquement, sans effort de mise en forme",
  "Le soignant garde la main : chaque transmission est relue et validée avant diffusion",
];

const MANAGEMENT_BENEFITS = [
  "Un tableau de bord pour piloter la traçabilité et la conformité de l'équipe en un coup d'œil",
  "Des transmissions plus complètes et plus homogènes, utiles en cas de contrôle ARS",
  "Une documentation quotidienne plus fidèle à la réalité des soins, avec un impact direct sur la cotation PATHOS et la dotation GMPS",
  "Une intégration par API sécurisée avec le logiciel métier existant, sans changer d'outil ni ressaisir les données",
];

const FAQ_ITEMS = [
  {
    question: "Qu'est-ce qu'une transmission ciblée et la méthode DAR ?",
    answer: "La méthode DAR (Données, Actions, Résultats) structure l'écrit professionnel autour de trois temps : ce qui est observé, ce qui est fait, et ce qui en résulte. Conçue aux États-Unis en 1980 par des infirmières de l'université de Minneapolis, elle a été introduite en France en 1986 et reste la référence des transmissions ciblées en établissement sanitaire et médico-social.",
  },
  {
    question: "Comment un logiciel de transmission s'intègre-t-il à mon DUI ?",
    answer: "Speakli communique automatiquement avec les logiciels métiers utilisés en EHPAD grâce à une synchronisation par API sécurisée. Le soignant documente à la voix, valide, et la transmission est transférée instantanément dans le DUI, sans double saisie.",
  },
  {
    question: "Quels bénéfices concrets pour les équipes soignantes ?",
    answer: "En moyenne, chaque soignant économise 36 minutes par service sur la documentation administrative des transmissions. Les équipes rapportent moins de charge mentale en fin de poste et davantage de temps disponible pour les résidents.",
  },
  {
    question: "Le logiciel remplace-t-il le jugement du soignant ?",
    answer: "Non. Speakli transcrit et structure l'observation dictée, mais le professionnel reste maître de bout en bout : il déclenche l'enregistrement, relit la transmission générée, corrige si nécessaire, puis valide avant diffusion dans le dossier résident.",
  },
  {
    question: "Le logiciel de transmission est-il conforme au RGPD et à la certification HDS ?",
    answer: "Oui. Speakli est hébergé sur une infrastructure HDS (Hébergement de Données de Santé) certifiée en France. Les données sont chiffrées de bout en bout, aucun enregistrement vocal n'est conservé après traitement, et l'accès reste strictement limité aux équipes autorisées.",
  },
];

export default function TransmissionEhpadContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6"
        style={{ background: "linear-gradient(135deg, #0c1d50 0%, #142875 40%, #1a3388 60%, #0a1840 100%)" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 text-xs font-medium mb-8" aria-label="Fil d'Ariane">
            <Link href="/" className="transition-opacity hover:opacity-75" style={{ color: "rgba(255,255,255,0.6)" }}>
              Accueil
            </Link>
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" style={{ color: "rgba(255,255,255,0.3)" }}>
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ color: "rgba(255,255,255,0.9)" }}>Logiciel de transmission EHPAD</span>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "rgba(147,197,253,0.85)" }}>
            Solution IA pour transmissions soignantes
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6" style={{ color: "#ffffff" }}>
            Logiciel de transmission <span style={{ color: "var(--sp-300)" }}>EHPAD</span>
          </h1>
          <p className="text-lg font-medium max-w-2xl mx-auto mb-10" style={{ color: "rgba(255,255,255,0.70)" }}>
            Speakli transforme la voix de vos soignants en transmissions ciblées, structurées et directement intégrées à votre dossier usager informatisé — sans saisie manuelle, sans oubli, sans perte de temps.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-white font-bold px-7 py-4 rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, var(--sp-600) 0%, var(--sp-500) 100%)", boxShadow: "0 4px 24px rgba(0,122,255,0.40)" }}
            >
              Demander une démo gratuite
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <Link
              href="/roi"
              className="inline-flex items-center justify-center gap-2 font-semibold px-7 py-4 rounded-xl text-base transition-all duration-200"
              style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.25)", background: "rgba(255,255,255,0.06)" }}
            >
              Calculer mon ROI
            </Link>
          </div>
        </div>
      </section>

      {/* ── Light zone ── */}
      <div style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}>

        {/* ── Pourquoi les transmissions sont critiques ── */}
        <section className="py-14 sm:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-5" style={{ color: "var(--sp-900)" }}>
              Pourquoi les transmissions sont critiques en EHPAD
            </h2>
            <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: "#4A5568" }}>
              <p>
                La transmission est le fil qui relie chaque équipe à la suivante : c&apos;est elle qui assure la continuité des soins d&apos;un résident, transmet une observation clinique, ou alerte sur un changement d&apos;état. Une transmission manquante ou incomplète, c&apos;est une information qui n&apos;existe plus pour l&apos;équipe suivante.
              </p>
              <p>
                Cet enjeu dépasse l&apos;organisation interne : la{" "}
                <Link href="/blog/tracabilite-soins-ehpad-reglementation" className="underline font-semibold" style={{ color: "var(--sp-500)" }}>
                  traçabilité des soins en EHPAD
                </Link>{" "}
                est encadrée par le Code de l&apos;action sociale et des familles et par le référentiel de certification de la Haute Autorité de Santé. Une transmission bien tracée protège le résident, sécurise juridiquement l&apos;établissement, et influence directement la qualité du dossier de soins présenté lors d&apos;une inspection.
              </p>
            </div>
          </div>
        </section>

        {/* ── Limites des transmissions en fin de service ── */}
        <section className="py-14 sm:py-20 px-4 sm:px-6" style={{ background: "rgba(255,255,255,0.5)" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-5" style={{ color: "var(--sp-900)" }}>
              Les limites des transmissions saisies en fin de service
            </h2>
            <div className="flex flex-col gap-4 text-base leading-relaxed" style={{ color: "#4A5568" }}>
              <p>
                Dans la majorité des établissements, la transmission écrite se fait encore en fin de poste, sur un poste fixe ou une tablette partagée. Le soignant doit se souvenir, plusieurs heures après le soin, des détails précis d&apos;une observation, au moment où la fatigue et la charge mentale de fin de service favorisent justement l&apos;oubli.
              </p>
              <p>
                Cette contrainte de temps réel est particulièrement sensible pour les événements imprévus, une chute, un refus de soin, un changement de comportement, où les circonstances exactes s&apos;effacent vite de la mémoire. Le résultat est connu des équipes de terrain : des transmissions plus courtes, plus génériques, et parfois lacunaires, non par manque de rigueur, mais par manque de temps et d&apos;accessibilité au bon moment.
              </p>
            </div>
          </div>
        </section>

        {/* ── Fonctionnement d'un logiciel de transmission ── */}
        <section className="py-14 sm:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-5" style={{ color: "var(--sp-900)" }}>
              Comment fonctionne un logiciel de transmission en EHPAD
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#4A5568" }}>
              Un logiciel de transmission centralise les observations soignantes dans le dossier résident, avec un horodatage, un auteur identifié et une structuration cohérente d&apos;un poste à l&apos;autre. Avec Speakli, cette documentation se fait directement à la voix, au moment du soin :
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {FLOW_STEPS.map((step, i) => (
                <div
                  key={step.label}
                  className="rounded-2xl p-5"
                  style={{ background: "#fff", border: "1px solid rgba(0,40,120,0.08)" }}
                >
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold mb-3"
                    style={{ background: "var(--sp-50)", color: "var(--sp-500)" }}
                  >
                    {i + 1}
                  </span>
                  <p className="font-bold text-sm mb-1" style={{ color: "var(--sp-900)" }}>{step.label}</p>
                  <p className="text-sm leading-snug" style={{ color: "#6B7280" }}>{step.sublabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Apport de la voix / IA + exemples ── */}
        <section className="py-14 sm:py-20 px-4 sm:px-6" style={{ background: "rgba(255,255,255,0.5)" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-5" style={{ color: "var(--sp-900)" }}>
              L&apos;apport de la voix et de l&apos;IA pour les transmissions
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#4A5568" }}>
              Dicter une observation prend quelques secondes, au chevet du résident, dans le prolongement naturel du soin. L&apos;IA de Speakli transcrit, filtre le bruit ambiant, reconnaît les accents régionaux et structure automatiquement l&apos;information dans le bon format. Concrètement, sur le terrain :
            </p>
            <div className="flex flex-col gap-4">
              {USE_CASES.map((uc) => (
                <div key={uc.title} className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid rgba(0,40,120,0.08)" }}>
                  <p className="font-bold text-sm mb-1.5" style={{ color: "var(--sp-900)" }}>{uc.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "#4A5568" }}>{uc.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Transmission ciblée / DAR ── */}
        <section className="py-14 sm:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-5" style={{ color: "var(--sp-900)" }}>
              Transmission ciblée et méthode DAR
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#4A5568" }}>
              La méthode DAR (Données, Actions, Résultats) est la référence des transmissions ciblées en établissement sanitaire et médico-social français depuis son introduction en 1986. Speakli structure automatiquement chaque observation dictée selon ce format, sans que le soignant n&apos;ait à y penser :
            </p>
            <div className="rounded-2xl p-6 space-y-4" style={{ background: "var(--sp-950)", border: "1px solid rgba(100,160,255,0.18)" }}>
              {DAR_EXAMPLE.map((item) => (
                <div key={item.label} className="flex gap-3 items-start">
                  <span className="text-[11px] font-bold rounded px-2 py-1 flex-shrink-0 mt-0.5" style={{ background: "rgba(255,255,255,0.12)", color: "#fff" }}>
                    {item.label}
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Intégration DUI ── */}
        <section className="py-14 sm:py-20 px-4 sm:px-6" style={{ background: "rgba(255,255,255,0.5)" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-5" style={{ color: "var(--sp-900)" }}>
              Intégration avec votre DUI et vos logiciels métier
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "#4A5568" }}>
              Un logiciel de transmission n&apos;a de valeur que s&apos;il s&apos;intègre à l&apos;existant. Speakli communique avec les principaux{" "}
              <Link href="/blog/dossier-soin-informatise-ehpad-guide" className="underline font-semibold" style={{ color: "var(--sp-500)" }}>
                dossiers usagers informatisés (DUI)
              </Link>{" "}
              du secteur médico-social par API sécurisée : la transmission validée par le soignant est transférée instantanément, horodatée et rattachée au bon résident, sans double saisie ni ressaisie manuelle.
            </p>
          </div>
        </section>

        {/* ── Bénéfices soignants / directions ── */}
        <section className="py-14 sm:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight mb-4" style={{ color: "var(--sp-900)" }}>
                Bénéfices pour les soignants
              </h2>
              <ul className="flex flex-col gap-3">
                {CAREGIVER_BENEFITS.map((b) => (
                  <li key={b} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: "#4A5568" }}>
                    <svg width="16" height="16" fill="none" stroke="var(--sp-500)" strokeWidth="2.5" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight mb-4" style={{ color: "var(--sp-900)" }}>
                Bénéfices pour les directions
              </h2>
              <ul className="flex flex-col gap-3">
                {MANAGEMENT_BENEFITS.map((b) => (
                  <li key={b} className="flex gap-2.5 text-sm leading-relaxed" style={{ color: "#4A5568" }}>
                    <svg width="16" height="16" fill="none" stroke="var(--sp-500)" strokeWidth="2.5" viewBox="0 0 24 24" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
              <p className="text-sm mt-4" style={{ color: "#6B7280" }}>
                Pour aller plus loin :{" "}
                <Link href="/blog/pathos-gmps-dotation-ehpad" className="underline font-semibold" style={{ color: "var(--sp-500)" }}>
                  l&apos;impact de la traçabilité sur votre dotation GMPS
                </Link>.
              </p>
            </div>
          </div>
        </section>

        {/* ── Sécurité / conformité ── */}
        <section className="py-14 sm:py-20 px-4 sm:px-6" style={{ background: "rgba(255,255,255,0.5)" }}>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-5" style={{ color: "var(--sp-900)" }}>
              Sécurité et conformité
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#4A5568" }}>
              Les transmissions contiennent des données de santé : leur traitement doit être irréprochable. Speakli est hébergé sur une infrastructure certifiée HDS (Hébergement de Données de Santé) en France, conforme au RGPD, avec un chiffrement de bout en bout. Aucun enregistrement vocal n&apos;est conservé après traitement, et l&apos;accès aux données reste strictement limité aux équipes autorisées.{" "}
              <Link href="/blog/hds-rgpd-logiciel-soins-ehpad" className="underline font-semibold" style={{ color: "var(--sp-500)" }}>
                En savoir plus sur les obligations HDS et RGPD
              </Link>.
            </p>
            <div className="flex flex-wrap gap-2">
              {["HDS Certifié", "RGPD Conforme", "Chiffrement E2E"].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg"
                  style={{ background: "var(--sp-50)", border: "1px solid var(--sp-100)", color: "var(--sp-700)" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--sp-500)" }} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-14 sm:py-20 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-8" style={{ color: "var(--sp-900)" }}>
              Questions fréquentes
            </h2>
            <div className="flex flex-col gap-6">
              {FAQ_ITEMS.map((item) => (
                <div key={item.question}>
                  <h3 className="font-bold text-base mb-2" style={{ color: "var(--sp-900)" }}>{item.question}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#4A5568" }}>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 text-center border-t" style={{ borderColor: "var(--sp-100)" }}>
          <div className="max-w-xl mx-auto">
            <p className="font-bold text-xl mb-2" style={{ color: "var(--sp-900)" }}>
              Envie de voir Speakli en action sur vos transmissions&nbsp;?
            </p>
            <p className="font-medium mb-6" style={{ color: "#4A5568" }}>
              Réservez une démo de 30 minutes, sans engagement.
            </p>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg text-base"
              style={{ backgroundColor: "var(--sp-500)" }}
            >
              Réserver une démo
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

export { FAQ_ITEMS };
