import { Document, Page, Text, View, StyleSheet, renderToBuffer } from "@react-pdf/renderer";

const BLUE  = "#007AFF";
const GREEN = "#34d399";
const DARK  = "#1A2E49";
const GREY  = "#718096";
const LGREY = "#A0AEC0";
const LIGHT = "#EAF3FF";
const WHITE = "#ffffff";
const BORDER= "#E2E8F0";

/* ─── Hypothèses de calcul (identiques au composant ROICalculator) ─── */
const VALEUR_POINT = 13.60;  // valeur du point GMPS 2024 (€/point)
const COEF_GMP     = 2.59;   // coefficient PMP → GMP

const s = StyleSheet.create({
  page:         { backgroundColor: WHITE, padding: 32, fontFamily: "Helvetica" },
  header:       { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: BORDER },
  logo:         { fontSize: 20, fontFamily: "Helvetica-Bold", color: DARK, letterSpacing: -0.5 },
  logoAccent:   { color: BLUE },
  headerDate:   { fontSize: 9, color: GREY },
  badge:        { backgroundColor: LIGHT, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4, marginTop: 4 },
  badgeText:    { fontSize: 8, color: BLUE, fontFamily: "Helvetica-Bold" },

  greeting:     { fontSize: 13, color: DARK, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  intro:        { fontSize: 9.5, color: GREY, lineHeight: 1.5, marginBottom: 14 },

  sectionTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", color: DARK, marginBottom: 8, paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: BORDER },

  row:          { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  rowLabel:     { fontSize: 9, color: GREY },
  rowValue:     { fontSize: 9, color: DARK, fontFamily: "Helvetica-Bold" },

  kpiRow:       { flexDirection: "row", gap: 10, marginBottom: 14 },
  kpiCard:      { flex: 1, backgroundColor: LIGHT, borderRadius: 8, padding: 10 },
  kpiAmount:    { fontSize: 15, fontFamily: "Helvetica-Bold", color: BLUE, marginBottom: 2 },
  kpiLabel:     { fontSize: 7.5, color: GREY, lineHeight: 1.3 },

  barSection:   { marginBottom: 14 },
  barRow:       { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  barLabel:     { fontSize: 8.5, color: DARK, width: 150 },
  barTrack:     { flex: 1, height: 9, backgroundColor: "#EDF2F7", borderRadius: 5, overflow: "hidden" },
  barFill:      { height: 9, backgroundColor: BLUE, borderRadius: 5 },
  barValue:     { fontSize: 8.5, color: DARK, fontFamily: "Helvetica-Bold", width: 80, textAlign: "right" },

  ctaBox:       { backgroundColor: DARK, borderRadius: 10, padding: 12, marginBottom: 14, alignItems: "center" },
  ctaTitle:     { fontSize: 11, fontFamily: "Helvetica-Bold", color: WHITE, marginBottom: 3, textAlign: "center" },
  ctaSub:       { fontSize: 8, color: "rgba(255,255,255,0.7)", marginBottom: 8, textAlign: "center", lineHeight: 1.4 },
  ctaLink:      { backgroundColor: BLUE, borderRadius: 7, paddingHorizontal: 16, paddingVertical: 6 },
  ctaLinkText:  { fontSize: 9, fontFamily: "Helvetica-Bold", color: WHITE },

  footer:       { borderTopWidth: 1, borderTopColor: BORDER, paddingTop: 8, flexDirection: "column", gap: 3 },
  footerRow:    { flexDirection: "row", justifyContent: "space-between" },
  footerText:   { fontSize: 7.5, color: GREY },
  disclaimer:   { fontSize: 7, color: LGREY, lineHeight: 1.4 },

  /* ─── Methodology page ─── */
  methodBox:    { backgroundColor: "#F7FAFF", borderRadius: 8, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: "#DDEEFF" },
  methodTitle:  { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: DARK, marginBottom: 6 },
  methodRow:    { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  methodLabel:  { fontSize: 8.5, color: GREY, flex: 1 },
  methodValue:  { fontSize: 8.5, color: DARK, fontFamily: "Helvetica-Bold" },
  methodNote:   { fontSize: 7.5, color: LGREY, marginTop: 4, lineHeight: 1.4 },
  calcBox:      { backgroundColor: WHITE, borderRadius: 6, padding: 10, marginBottom: 10, borderWidth: 1, borderColor: BORDER },
  calcTitle:    { fontSize: 9.5, fontFamily: "Helvetica-Bold", color: BLUE, marginBottom: 6 },
  calcLine:     { fontSize: 8.5, color: DARK, marginBottom: 3, lineHeight: 1.4 },
  calcResult:   { fontSize: 9, fontFamily: "Helvetica-Bold", color: DARK, borderTopWidth: 1, borderTopColor: BORDER, paddingTop: 4, marginTop: 4 },
  sourceLine:   { fontSize: 7.5, color: LGREY, lineHeight: 1.5 },

  /* ─── Extra-financial page ─── */
  extraCard:      { flex: 1, backgroundColor: "#FAFBFF", borderRadius: 8, padding: 10, borderLeftWidth: 3, borderTopWidth: 1, borderTopColor: BORDER, borderRightWidth: 1, borderRightColor: BORDER, borderBottomWidth: 1, borderBottomColor: BORDER },
  extraCardTitle: { fontSize: 9.5, fontFamily: "Helvetica-Bold", marginBottom: 6 },
  extraBullet:    { fontSize: 8.5, color: DARK, marginBottom: 3, lineHeight: 1.4 },
});

function fmt(n: number) {
  return Math.round(n).toString() + " \u20ac";
}

function fmtN(n: number, dec = 1) {
  return n.toFixed(dec).replace(".", ",");
}

interface Props {
  civility:  string;
  firstName: string;
  lastName:  string;
  formData: {
    lits: number; nbAS: number; nbIDE: number; logiciel: string;
    support: string; pmpActuel: number; pmpCible: number;
  };
  roi: { val_an: number; gain_dotation: number; roi_total: number };
}

export async function generatePdfBuffer(props: Props): Promise<Buffer> {
  return renderToBuffer(
    <ROIPdf
      civility={props.civility}
      firstName={props.firstName}
      lastName={props.lastName}
      formData={props.formData}
      roi={props.roi}
    />
  ) as unknown as Promise<Buffer>;
}

export function ROIPdf({ civility, firstName, lastName, formData, roi }: Props) {
  const date  = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  /* ─── Calculs intermédiaires pour la page méthodologie ─── */
  const delta_pmp   = Math.max(0, formData.pmpCible - formData.pmpActuel);

  const PageFooter = () => (
    <View style={s.footer}>
      <View style={s.footerRow}>
        <Text style={s.footerText}>SAS CTSUR (Speakli) · contact@speakli.fr</Text>
        <Text style={s.footerText}>speakli.fr</Text>
      </View>
      <Text style={s.disclaimer}>
        Ce document est confidentiel et établi à titre indicatif. Les estimations sont basées sur des moyennes terrain et peuvent varier selon votre contexte. SAS CTSUR (Speakli) ne saurait être tenu responsable des écarts avec les résultats réels.
      </Text>
    </View>
  );

  const PageHeader = () => (
    <View style={s.header}>
      <View>
        <Text style={s.logo}>Speak<Text style={s.logoAccent}>li</Text></Text>
        <View style={s.badge}><Text style={s.badgeText}>Simulation PATHOS confidentielle</Text></View>
      </View>
      <Text style={s.headerDate}>Établi le {date}</Text>
    </View>
  );

  return (
    <Document>

      {/* ══════════════════ PAGE 1 — RÉSULTATS ══════════════════ */}
      <Page size="A4" style={s.page}>
        <PageHeader />

        <Text style={s.greeting}>Bonjour {civility} {firstName} {lastName},</Text>
        <Text style={s.intro}>
          Suite à votre simulation sur speakli.fr, voici votre estimation personnalisée du gain de dotation soins (PATHOS).
          Ces résultats sont calculés sur la base des informations que vous avez renseignées et restent des estimations.
          La page 2 présente les impacts extra-financiers, la page 3 détaille les hypothèses et le calcul pas à pas.
        </Text>

        {/* KPI cards */}
        <Text style={s.sectionTitle}>Résultats estimés</Text>
        <View style={s.kpiRow}>
          <View style={[s.kpiCard, { backgroundColor: BLUE }]}>
            <Text style={[s.kpiAmount, { color: WHITE }]}>{fmt(roi.gain_dotation)}</Text>
            <Text style={[s.kpiLabel, { color: "rgba(255,255,255,0.8)" }]}>Gain de dotation soins estimé / an</Text>
          </View>
        </View>

        {/* Establishment params */}
        <Text style={s.sectionTitle}>Paramètres de votre établissement</Text>
        <View style={{ marginBottom: 12 }}>
          {[
            ["Nombre de lits",            `${formData.lits} lits`],
            ["Aides-soignants",           `${formData.nbAS} ETP`],
            ["Infirmiers (IDE)",           `${formData.nbIDE} ETP`],
            ["Logiciel DUI",              formData.logiciel],
            ["PMP actuel",                `${formData.pmpActuel} pts`],
            ["PMP cible avec Speakli",    `${formData.pmpCible} pts`],
          ].map(([label, value]) => (
            <View key={label} style={s.row}>
              <Text style={s.rowLabel}>{label}</Text>
              <Text style={s.rowValue}>{value}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <View style={s.ctaBox}>
          <Text style={s.ctaTitle}>Passez à l'étape suivante</Text>
          <Text style={s.ctaSub}>
            Discutons de votre établissement en détail.{"\n"}
            Réservez une démo gratuite de 30 minutes avec notre équipe.
          </Text>
          <View style={s.ctaLink}>
            <Text style={s.ctaLinkText}>meetings-eu1.hubspot.com/ruben-weinstein</Text>
          </View>
        </View>

        <PageFooter />
      </Page>

      {/* ══════════════════ PAGE 2 — IMPACTS EXTRA-FINANCIERS ══════════════════ */}
      <Page size="A4" style={s.page}>
        <PageHeader />

        <Text style={[s.sectionTitle, { marginBottom: 6 }]}>Impacts extra-financiers</Text>
        <Text style={s.intro}>
          Au-delà du ROI financier quantifié, Speakli génère des bénéfices significatifs sur 4 dimensions clés — non directement monétisables, mais stratégiquement déterminants pour la performance et la pérennité de votre établissement.
        </Text>

        {/* Row 1 */}
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
          <View style={[s.extraCard, { borderLeftColor: BLUE }]}>
            <Text style={[s.extraCardTitle, { color: BLUE }]}>Qualité des soins & des opérations</Text>
            <Text style={s.extraBullet}>• Traçabilité complète et en temps réel des actes de soin</Text>
            <Text style={s.extraBullet}>• Réduction des erreurs de retranscription et des oublis</Text>
            <Text style={s.extraBullet}>• Amélioration de la continuité des soins inter-équipes</Text>
            <Text style={s.extraBullet}>• Données fiables pour le suivi clinique et les évaluations</Text>
            <Text style={s.extraBullet}>• Temps libéré directement alloué au résident</Text>
          </View>
          <View style={[s.extraCard, { borderLeftColor: GREEN }]}>
            <Text style={[s.extraCardTitle, { color: "#16a34a" }]}>Qualité de Vie au Travail (QVT)</Text>
            <Text style={s.extraBullet}>• Allègement de la charge administrative des soignants</Text>
            <Text style={s.extraBullet}>• Recentrage sur le soin direct, source de sens professionnel</Text>
            <Text style={s.extraBullet}>• Réduction du stress lié aux fins de poste (traçabilité différée)</Text>
            <Text style={s.extraBullet}>• Amélioration du rapport à l'outil numérique au quotidien</Text>
          </View>
        </View>

        {/* Row 2 */}
        <View style={{ flexDirection: "row", gap: 10, marginBottom: 12 }}>
          <View style={[s.extraCard, { borderLeftColor: "#a78bfa" }]}>
            <Text style={[s.extraCardTitle, { color: "#7c3aed" }]}>Attractivité employeur & fidélisation</Text>
            <Text style={s.extraBullet}>• Image d'établissement innovant auprès des candidats</Text>
            <Text style={s.extraBullet}>• Réduction du turn-over lié à la charge administrative</Text>
            <Text style={s.extraBullet}>• Argument différenciant dans les offres d'emploi</Text>
            <Text style={s.extraBullet}>• Meilleur onboarding grâce à une documentation structurée</Text>
          </View>
          <View style={[s.extraCard, { borderLeftColor: "#f59e0b" }]}>
            <Text style={[s.extraCardTitle, { color: "#d97706" }]}>Risques médico-légaux</Text>
            <Text style={s.extraBullet}>• Traçabilité exhaustive = preuve en cas de plainte ou litige</Text>
            <Text style={s.extraBullet}>• Conformité renforcée lors des contrôles ARS / tutelles</Text>
            <Text style={s.extraBullet}>• Réduction des non-conformités documentaires en inspection</Text>
            <Text style={s.extraBullet}>• Protection des équipes soignantes par la documentation</Text>
          </View>
        </View>

        {/* Closing note */}
        <View style={[s.methodBox, { backgroundColor: "#FFFBF0", borderColor: "#f59e0b" }]}>
          <Text style={[s.methodTitle, { color: "#92400e" }]}>Note méthodologique</Text>
          <Text style={s.methodNote}>
            Ces impacts ne sont pas intégrés au calcul financier, car leur monétisation dépend du contexte propre à chaque établissement. Ils représentent néanmoins des leviers de valeur réels et mesurables à moyen terme. Notre équipe peut vous aider à les qualifier lors d'une session de travail dédiée.
          </Text>
        </View>

        <View style={{ marginTop: "auto" }}>
          <PageFooter />
        </View>
      </Page>

      {/* ══════════════════ PAGE 3 — MÉTHODOLOGIE ══════════════════ */}
      <Page size="A4" style={s.page}>
        <PageHeader />

        <Text style={[s.sectionTitle, { marginBottom: 14 }]}>Méthodologie & Hypothèses de calcul</Text>

        {/* Hypothèses générales */}
        <View style={s.methodBox}>
          <Text style={s.methodTitle}>Hypothèses générales</Text>
          {[
            ["Valeur du point GMPS (2024)",            `${fmtN(VALEUR_POINT)} €/point`],
            ["Coefficient PMP → GMP",                  `× ${COEF_GMP} (référentiel GMPS)`],
          ].map(([label, value]) => (
            <View key={label} style={s.methodRow}>
              <Text style={s.methodLabel}>{label}</Text>
              <Text style={s.methodValue}>{value}</Text>
            </View>
          ))}
        </View>

        {/* Calcul 2 — Gain dotation GMPS */}
        <View style={s.calcBox}>
          <Text style={s.calcTitle}>Calcul — Gain de dotation GMPS / an</Text>
          <Text style={s.calcLine}>
            Formule : (PMP cible − PMP actuel) × {COEF_GMP} × nb lits × {fmtN(VALEUR_POINT)} €/point
          </Text>
          <Text style={s.calcLine}>
            {"Delta PMP : "}({formData.pmpCible} − {formData.pmpActuel}) = {delta_pmp} points
          </Text>
          <Text style={s.calcLine}>
            {delta_pmp} pts × {COEF_GMP} × {formData.lits} lits × {fmtN(VALEUR_POINT)} €/pt = {fmt(roi.gain_dotation)}
          </Text>
          <Text style={s.calcResult}>
            Gain de dotation GMPS estimé : {fmt(roi.gain_dotation)}
          </Text>
          <Text style={s.methodNote}>
            Le GMPS (Groupe iso-ressources Moyen Pondéré Soins) détermine une partie de la dotation soins allouée par l'ARS.
            Une meilleure traçabilité permet de documenter plus fidèlement la charge en soins réelle,
            et donc d'améliorer le PMP (Pathos Moyen Pondéré) de l'établissement.
          </Text>
        </View>

        {/* Sources */}
        <View style={{ marginTop: 4 }}>
          <Text style={[s.methodTitle, { fontSize: 8.5, color: GREY }]}>Sources & références</Text>
          <Text style={s.sourceLine}>
            • Valeur du point GMPS : circulaire budgétaire DGCS 2024 — 13,60 €/point
          </Text>
          <Text style={s.sourceLine}>
            • Coefficient PMP → GMP (2,59) : référentiel GMPS, grille Pathos nationale
          </Text>
        </View>

        <View style={{ marginTop: "auto" }}>
          <PageFooter />
        </View>
      </Page>

    </Document>
  );
}
