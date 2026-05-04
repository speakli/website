"use client";
import { useState, useEffect } from "react"; // useEffect kept for pmpCible sync
import dynamic from "next/dynamic";
import elephantAnim from "@/data/elephant-happy.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

/* ─── Constants ──────────────────────────────────────────── */
const TAUX_GAIN = 0.4;
const JOURS_MOIS = 21.67;
const TAUX_AS = 22.27;
const TAUX_IDE = 29.11;
const VALEUR_POINT = 13.6;

const SUPPORTS = ["Tablette", "Smartphone", "Mixte"] as const;
const LOGICIELS = ["NETSoins", "Titan", "Livia", "Autre (Préciser)"] as const;

/* ─── Formatting ──────────────────────────────────────────── */
function eur(n: number) {
  return Math.round(n).toLocaleString("fr-FR") + "\u00a0€";
}

/* ─── Sub-components ──────────────────────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "#9ca3af" }}>
      {children}
    </span>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  step = 1,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  step?: number;
  hint?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type="number"
        min={min}
        step={step}
        value={value}
        onChange={(e) => {
          const v = parseFloat(e.target.value);
          if (!isNaN(v) && v >= min) onChange(v);
        }}
        className="w-full rounded-xl px-4 py-3 text-sm font-semibold outline-none transition-colors"
        style={{ border: "1.5px solid rgba(0,40,120,0.14)", background: "#f7f9ff", color: "var(--sp-900)" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--sp-500)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,40,120,0.14)")}
      />
      {hint && <p className="text-[10px] mt-1.5" style={{ color: "#b0b9cc" }}>{hint}</p>}
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl px-4 py-3 text-sm font-semibold outline-none transition-colors"
        style={{ border: "1.5px solid rgba(0,40,120,0.14)", background: "#f7f9ff", color: "var(--sp-900)" }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--sp-500)")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,40,120,0.14)")}
      />
    </div>
  );
}

function SelectInput({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl px-4 py-3 text-sm font-semibold outline-none appearance-none cursor-pointer"
          style={{ border: "1.5px solid rgba(0,40,120,0.14)", background: "#f7f9ff", color: "var(--sp-900)" }}
        >
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" style={{ color: "#9ca3af" }}>
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Email Popup ─────────────────────────────────────────── */
function EmailPopup({
  roi,
  formData,
  onClose,
}: {
  roi: { val_an: number; gain_dotation: number; roi_total: number };
  formData: {
    lits: number; nbAS: number; nbIDE: number; logiciel: string;
    support: string; tempsTrace: number; pmpActuel: number; pmpCible: number;
  };
  onClose: () => void;
}) {
  const [civility, setCivility] = useState<"M." | "Mme">("M.");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const canSend = email.trim() && firstName.trim() && lastName.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/roi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          civility,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          ...formData,
          roi: {
            val_an: Math.round(roi.val_an),
            gain_dotation: Math.round(roi.gain_dotation),
            roi_total: Math.round(roi.roi_total),
          },
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = { border: "1.5px solid rgba(0,40,120,0.14)", background: "#f7f9ff", color: "var(--sp-900)" };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,22,40,0.72)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-w-md rounded-3xl p-8"
        style={{ background: "#fff", boxShadow: "0 32px 80px rgba(0,20,80,0.22)" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
          style={{ background: "rgba(0,40,120,0.06)", color: "#6b7280" }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {status === "success" ? (
          <div className="text-center py-2">
            <div className="flex justify-center mb-2">
              <Lottie
                animationData={elephantAnim}
                loop={false}
                style={{ width: 220, height: 220 }}
              />
            </div>
            <h3 className="text-xl font-extrabold mb-2" style={{ color: "var(--sp-900)" }}>
              Résultats envoyés !
            </h3>
            <p className="text-sm font-medium mb-6" style={{ color: "#6b7280" }}>
              Vérifiez votre boîte mail (et vos spams). Notre équipe est disponible pour vous accompagner.
            </p>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
              style={{ background: "var(--sp-500)" }}
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-extrabold mb-1 pr-8" style={{ color: "var(--sp-900)" }}>
              Recevez votre analyse complète
            </h3>
            <p className="text-sm font-medium mb-6" style={{ color: "#6b7280" }}>
              Renseignez vos coordonnées pour recevoir le rapport PDF personnalisé.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Civility + name */}
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <Label>Civilité</Label>
                  <div className="relative">
                    <select
                      value={civility}
                      onChange={(e) => setCivility(e.target.value as "M." | "Mme")}
                      className="rounded-xl px-3 py-3 text-sm font-semibold outline-none appearance-none cursor-pointer pr-7"
                      style={inputStyle}
                    >
                      <option value="M.">M.</option>
                      <option value="Mme">Mme</option>
                    </select>
                    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2" style={{ color: "#9ca3af" }}>
                      <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <Label>Prénom</Label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jean"
                    className="w-full rounded-xl px-4 py-3 text-sm font-semibold outline-none transition-colors"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--sp-500)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,40,120,0.14)")}
                  />
                </div>
                <div className="flex-1">
                  <Label>Nom</Label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Dupont"
                    className="w-full rounded-xl px-4 py-3 text-sm font-semibold outline-none transition-colors"
                    style={inputStyle}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--sp-500)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,40,120,0.14)")}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label>Email professionnel</Label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="directeur@monehpad.fr"
                  className="w-full rounded-xl px-4 py-3 text-sm font-semibold outline-none transition-colors"
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--sp-500)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,40,120,0.14)")}
                />
              </div>

              {status === "error" && (
                <p className="text-xs font-medium" style={{ color: "#ef4444" }}>
                  Une erreur est survenue. Réessayez ou contactez contact@speakli.fr
                </p>
              )}
              <button
                type="submit"
                disabled={!canSend || status === "loading"}
                className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                style={{ background: "var(--sp-500)" }}
              >
                {status === "loading" ? "Envoi en cours…" : "Recevoir mon rapport PDF"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Main component ──────────────────────────────────────── */
export default function ROICalculator() {
  const [lits, setLits] = useState(82);
  const [nbAS, setNbAS] = useState(17);
  const [nbIDE, setNbIDE] = useState(7);
  const [logiciel, setLogiciel] = useState("NETSoins");
  const [logicielAutre, setLogicielAutre] = useState("");
  const [support, setSupport] = useState<string>("Tablette");
  const [tempsTrace, setTempsTrace] = useState(1.5);
  const [pmpActuel, setPmpActuel] = useState(180);
  const [pmpCible, setPmpCible] = useState(200);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setPmpCible((prev) => (prev < pmpActuel ? pmpActuel : prev));
  }, [pmpActuel]);

  /* ── Calculations ── */
  const hAS = nbAS * tempsTrace * TAUX_GAIN * JOURS_MOIS;
  const hIDE = nbIDE * tempsTrace * TAUX_GAIN * JOURS_MOIS;
  const val_an = (hAS * TAUX_AS + hIDE * TAUX_IDE) * 12;
  const gain_dotation = Math.max(0, pmpCible - pmpActuel) * 2.59 * lits * VALEUR_POINT;
  const roi_total = val_an + gain_dotation;

  const logicielFinal = logiciel === "Autre (Préciser)" ? logicielAutre.trim() || "Autre" : logiciel;

  const canSubmit =
    lits > 0 &&
    nbAS > 0 &&
    nbIDE > 0 &&
    logiciel !== "" &&
    (logiciel !== "Autre (Préciser)" || logicielAutre.trim() !== "") &&
    tempsTrace > 0 &&
    pmpActuel > 0;

  const formData = { lits, nbAS, nbIDE, logiciel: logicielFinal, support, tempsTrace, pmpActuel, pmpCible };
  const roiData = { val_an, gain_dotation, roi_total };

  return (
    <div style={{ background: "linear-gradient(120deg, #c8d9f8 0%, #f4f8ff 40%, #ffffff 55%, #d0eafa 100%)" }}>
      <section
        id="roi"
        className="py-16 sm:py-24 px-4 sm:px-6"
        style={{ background: "transparent" }}
      >
        <div className="max-w-5xl mx-auto">

          {/* ── Header ── */}
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--sp-500)" }}>
              Calculateur de ROI
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4" style={{ color: "var(--sp-900)" }}>
              Estimez votre gain réel{" "}
              <span style={{ color: "var(--sp-500)" }}>avec Speakli</span>
            </h2>
            <p className="text-lg font-medium max-w-xl mx-auto" style={{ color: "#4A5568" }}>
              Renseignez les caractéristiques de votre établissement pour obtenir votre estimation personnalisée.
            </p>
          </div>

          {/* ── Form ── */}
          <div
            className="rounded-3xl p-6 sm:p-10"
            style={{
              background: "#fff",
              border: "1px solid rgba(0,40,120,0.07)",
              boxShadow: "0 4px 24px rgba(0,20,80,0.07)",
            }}
          >
            <p className="text-xs font-bold uppercase tracking-widest mb-7" style={{ color: "var(--sp-500)" }}>
              Votre établissement
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <NumberInput label="Nombre de lits" value={lits} onChange={setLits} min={1} />
              <NumberInput label="Aides-soignants (AS)" value={nbAS} onChange={setNbAS} min={1} />
              <NumberInput label="Infirmiers diplômés (IDE)" value={nbIDE} onChange={setNbIDE} min={1} />
              <SelectInput label="Logiciel DUI" options={LOGICIELS} value={logiciel} onChange={setLogiciel} />
              {logiciel === "Autre (Préciser)" && (
                <TextInput
                  label="Préciser le logiciel"
                  value={logicielAutre}
                  onChange={setLogicielAutre}
                  placeholder="Nom de votre logiciel DUI…"
                />
              )}
              <SelectInput label="Support utilisé" options={SUPPORTS} value={support} onChange={setSupport} />
              <NumberInput
                label="Temps de traçabilité / soignant (h/jour)"
                value={tempsTrace}
                onChange={setTempsTrace}
                min={0.1}
                step={0.25}
                hint="Estimez le temps moyen passé sur la documentation"
              />
            </div>

            <div className="mt-7 mb-5">
              <div className="h-px" style={{ background: "rgba(0,40,120,0.07)" }} />
              <p className="text-xs font-bold uppercase tracking-widest mt-5 mb-5" style={{ color: "var(--sp-500)" }}>
                Données de financement (GMPS)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <NumberInput
                label="PMP actuel (points)"
                value={pmpActuel}
                onChange={setPmpActuel}
                min={1}
                hint="Pathos Moyen Pondéré lors de votre dernière coupe"
              />
              <NumberInput
                label="PMP cible (points)"
                value={pmpCible}
                onChange={setPmpCible}
                min={pmpActuel}
                hint="Objectif après amélioration de la traçabilité"
              />
            </div>

            {/* CTA Button */}
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                disabled={!canSubmit}
                onClick={() => setShowPopup(true)}
                className="inline-flex items-center gap-3 rounded-2xl px-10 py-4 text-base font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
                style={{ background: canSubmit ? "var(--sp-500)" : "#9ca3af" }}
              >
                Calculer mon ROI
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-12 sm:py-16 px-4 sm:px-6 text-center"
        style={{ background: "transparent" }}
      >
        <div className="max-w-xl mx-auto">
          <p className="font-bold text-xl mb-2" style={{ color: "var(--sp-900)" }}>
            Ces chiffres vous parlent&nbsp;?
          </p>
          <p className="font-medium mb-8" style={{ color: "#4A5568" }}>
            Réservez une démo de 30 minutes.
          </p>
          <a
            href="https://calendly.com/ruben-speakli/30min"
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

      {/* ── Email Popup ── */}
      {showPopup && (
        <EmailPopup
          roi={roiData}
          formData={formData}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
