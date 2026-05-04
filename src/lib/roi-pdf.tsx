import { Document, Page, Text, View, StyleSheet, renderToBuffer } from "@react-pdf/renderer";

const BLUE = "#007AFF";
const DARK = "#1A2E49";
const GREY = "#718096";
const LIGHT = "#EAF3FF";
const WHITE = "#ffffff";

const s = StyleSheet.create({
  page:       { backgroundColor: WHITE, padding: 32, fontFamily: "Helvetica" },
  header:     { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 18, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: "#E2E8F0" },
  logo:       { fontSize: 20, fontFamily: "Helvetica-Bold", color: DARK, letterSpacing: -0.5 },
  logoAccent: { color: BLUE },
  headerDate: { fontSize: 9, color: GREY },
  badge:      { backgroundColor: LIGHT, borderRadius: 6, paddingHorizontal: 10, paddingVertical: 4, marginTop: 4 },
  badgeText:  { fontSize: 8, color: BLUE, fontFamily: "Helvetica-Bold" },

  greeting:   { fontSize: 13, color: DARK, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  intro:      { fontSize: 9.5, color: GREY, lineHeight: 1.5, marginBottom: 16 },

  sectionTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", color: DARK, marginBottom: 8, paddingBottom: 5, borderBottomWidth: 1, borderBottomColor: "#E2E8F0" },

  row:        { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
  rowLabel:   { fontSize: 9, color: GREY },
  rowValue:   { fontSize: 9, color: DARK, fontFamily: "Helvetica-Bold" },

  mb20:       { marginBottom: 14 },
  mb28:       { marginBottom: 18 },

  kpiRow:     { flexDirection: "row", gap: 10, marginBottom: 16 },
  kpiCard:    { flex: 1, backgroundColor: LIGHT, borderRadius: 8, padding: 11 },
  kpiAmount:  { fontSize: 16, fontFamily: "Helvetica-Bold", color: BLUE, marginBottom: 2 },
  kpiLabel:   { fontSize: 7.5, color: GREY, lineHeight: 1.3 },

  barSection: { marginBottom: 16 },
  barRow:     { flexDirection: "row", alignItems: "center", marginBottom: 7 },
  barLabel:   { fontSize: 8.5, color: DARK, width: 150 },
  barTrack:   { flex: 1, height: 9, backgroundColor: "#EDF2F7", borderRadius: 5, overflow: "hidden" },
  barFill:    { height: 9, backgroundColor: BLUE, borderRadius: 5 },
  barValue:   { fontSize: 8.5, color: DARK, fontFamily: "Helvetica-Bold", width: 80, textAlign: "right" },

  ctaBox:     { backgroundColor: DARK, borderRadius: 10, padding: 14, marginBottom: 16, alignItems: "center" },
  ctaTitle:   { fontSize: 12, fontFamily: "Helvetica-Bold", color: WHITE, marginBottom: 4, textAlign: "center" },
  ctaSub:     { fontSize: 8.5, color: "rgba(255,255,255,0.7)", marginBottom: 10, textAlign: "center", lineHeight: 1.4 },
  ctaLink:    { backgroundColor: BLUE, borderRadius: 7, paddingHorizontal: 18, paddingVertical: 7 },
  ctaLinkText:{ fontSize: 9.5, fontFamily: "Helvetica-Bold", color: WHITE },

  footer:     { borderTopWidth: 1, borderTopColor: "#E2E8F0", paddingTop: 10, flexDirection: "column", gap: 4 },
  footerText: { fontSize: 7.5, color: GREY },
  disclaimer: { fontSize: 7, color: "#A0AEC0", lineHeight: 1.4 },
});

function fmt(n: number) {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " \u20ac";
}

interface Props {
  civility: string;
  firstName: string;
  lastName: string;
  formData: {
    lits: number; nbAS: number; nbIDE: number; logiciel: string;
    support: string; tempsTrace: number; pmpActuel: number; pmpCible: number;
  };
  roi: { val_an: number; gain_dotation: number; roi_total: number };
}

export async function generatePdfBuffer(props: Props): Promise<Buffer> {
  const element = (
    <ROIPdf
      civility={props.civility}
      firstName={props.firstName}
      lastName={props.lastName}
      formData={props.formData}
      roi={props.roi}
    />
  );
  return renderToBuffer(element) as unknown as Promise<Buffer>;
}

export function ROIPdf({ civility, firstName, lastName, formData, roi }: Props) {
  const total = roi.roi_total;
  const pct1 = total > 0 ? Math.min((roi.val_an / total) * 100, 100) : 0;
  const pct2 = total > 0 ? Math.min((roi.gain_dotation / total) * 100, 100) : 0;
  const date = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });

  return (
    <Document>
      <Page size="A4" style={s.page}>

        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.logo}>Speak<Text style={s.logoAccent}>li</Text></Text>
            <View style={s.badge}><Text style={s.badgeText}>Simulation ROI confidentielle</Text></View>
          </View>
          <Text style={s.headerDate}>Établi le {date}</Text>
        </View>

        {/* Greeting */}
        <Text style={s.greeting}>Bonjour {civility} {firstName} {lastName},</Text>
        <Text style={s.intro}>
          Suite à votre simulation sur speakli.fr, voici votre rapport personnalisé d'estimation de retour sur investissement.
          Ces résultats sont calculés sur la base des informations que vous avez renseignées et restent des estimations.
        </Text>

        {/* KPI cards */}
        <Text style={s.sectionTitle}>Résultats estimés</Text>
        <View style={s.kpiRow}>
          <View style={s.kpiCard}>
            <Text style={s.kpiAmount}>{fmt(roi.val_an)}</Text>
            <Text style={s.kpiLabel}>Valeur du temps libéré / an</Text>
          </View>
          <View style={s.kpiCard}>
            <Text style={s.kpiAmount}>{fmt(roi.gain_dotation)}</Text>
            <Text style={s.kpiLabel}>Gain de dotation GMPS / an</Text>
          </View>
          <View style={[s.kpiCard, { backgroundColor: BLUE }]}>
            <Text style={[s.kpiAmount, { color: WHITE }]}>{fmt(roi.roi_total)}</Text>
            <Text style={[s.kpiLabel, { color: "rgba(255,255,255,0.8)" }]}>ROI TOTAL estimé / an</Text>
          </View>
        </View>

        {/* Bar chart */}
        <View style={s.barSection}>
          <Text style={[s.sectionTitle, { marginBottom: 14 }]}>Répartition du gain</Text>
          <View style={s.barRow}>
            <Text style={s.barLabel}>Temps libéré</Text>
            <View style={s.barTrack}><View style={[s.barFill, { width: `${pct1}%` }]} /></View>
            <Text style={s.barValue}>{fmt(roi.val_an)}</Text>
          </View>
          <View style={s.barRow}>
            <Text style={s.barLabel}>Gain dotation GMPS</Text>
            <View style={s.barTrack}><View style={[s.barFill, { width: `${pct2}%`, backgroundColor: "#34d399" }]} /></View>
            <Text style={s.barValue}>{fmt(roi.gain_dotation)}</Text>
          </View>
        </View>

        {/* Establishment params */}
        <Text style={s.sectionTitle}>Paramètres de votre établissement</Text>
        <View style={s.mb20}>
          {[
            ["Nombre de lits", `${formData.lits} lits`],
            ["Aides-soignants", `${formData.nbAS} ETP`],
            ["Infirmiers (IDE)", `${formData.nbIDE} ETP`],
            ["Logiciel DUI", formData.logiciel],
            ["Temps de traçage actuel", `${formData.tempsTrace} h / soignant / jour`],
            ["PMP actuel", `${formData.pmpActuel} pts`],
            ["PMP cible avec Speakli", `${formData.pmpCible} pts`],
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
            <Text style={s.ctaLinkText}>calendly.com/ruben-speakli/30min</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={s.footer}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={s.footerText}>SAS CT (Speakli) · contact@speakli.fr</Text>
            <Text style={s.footerText}>speakli.fr</Text>
          </View>
          <Text style={s.disclaimer}>
            Ce document est confidentiel et établi à titre indicatif. Les estimations sont basées sur des moyennes terrain et peuvent varier selon votre contexte. SAS CT (Speakli) ne saurait être tenu responsable des écarts avec les résultats réels.
          </Text>
        </View>

      </Page>
    </Document>
  );
}
