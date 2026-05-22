import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Path,
  G,
} from "@react-pdf/renderer";
import { GUIA } from "./content";

const COLORS = {
  red: "#CC1316",
  redDark: "#A50413",
  black: "#222222",
  gray800: "#3B3B3B",
  gray600: "#555555",
  gray400: "#8C8C8C",
  gray100: "#D9D9D9",
  offWhite: "#F0F0F0",
  white: "#F4F5F7",
};

const styles = StyleSheet.create({
  cover: {
    backgroundColor: COLORS.black,
    color: COLORS.white,
    padding: 56,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  coverTopRule: {
    width: 64,
    height: 3,
    backgroundColor: COLORS.red,
    marginBottom: 24,
  },
  coverEyebrow: {
    color: COLORS.gray400,
    fontSize: 10,
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 18,
  },
  coverTitle: {
    color: COLORS.white,
    fontSize: 38,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1.15,
  },
  coverSubtitle: {
    color: COLORS.gray100,
    fontSize: 13,
    marginTop: 18,
    lineHeight: 1.5,
    maxWidth: 380,
  },
  coverFooter: {
    color: COLORS.gray400,
    fontSize: 9,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },

  page: {
    backgroundColor: COLORS.white,
    color: COLORS.black,
    padding: 56,
    fontSize: 11,
    lineHeight: 1.55,
    fontFamily: "Helvetica",
  },
  sectionTitle: {
    color: COLORS.black,
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    marginTop: 18,
    marginBottom: 10,
  },
  sectionTitleRisco: {
    color: COLORS.redDark,
  },
  paragraph: {
    color: COLORS.gray800,
    marginBottom: 8,
  },
  checklistBox: {
    backgroundColor: COLORS.offWhite,
    borderRadius: 6,
    padding: 22,
    marginTop: 14,
  },
  checklistIntro: {
    color: COLORS.gray600,
    fontSize: 11,
    marginBottom: 12,
  },
  checklistRow: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "flex-start",
  },
  checklistBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.red,
    color: COLORS.white,
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    paddingTop: 3,
    marginRight: 10,
  },
  checklistText: {
    flex: 1,
    color: COLORS.gray800,
    fontSize: 11,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    left: 56,
    right: 56,
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: COLORS.gray100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    color: COLORS.gray400,
    fontSize: 8,
    letterSpacing: 1.2,
  },
});

function MarkSvg({ size = 36, color = COLORS.red }: { size?: number; color?: string }) {
  const w = Math.round(size * (45 / 56));
  return (
    <Svg width={w} height={size} viewBox="0 0 45 56">
      <G fill={color}>
        <Path d="M2,54 L2,24 L13,30 L13,54 Z" />
        <Path d="M17,54 L17,4 L29,11 L29,54 Z" />
        <Path d="M33,54 L33,26 L43,32 L43,54 Z" />
      </G>
    </Svg>
  );
}

function Wordmark({ color }: { color: string }) {
  return (
    <Text
      style={{
        fontFamily: "Helvetica-Bold",
        fontSize: 30,
        color,
        marginLeft: 10,
      }}
    >
      R21
    </Text>
  );
}

function Header() {
  return (
    <View
      fixed
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 22,
      }}
    >
      <MarkSvg size={22} color={COLORS.red} />
      <Text
        style={{
          marginLeft: 8,
          color: COLORS.black,
          fontFamily: "Helvetica-Bold",
          fontSize: 14,
        }}
      >
        R21
      </Text>
      <Text
        style={{
          marginLeft: "auto",
          color: COLORS.gray400,
          fontSize: 8,
          letterSpacing: 1.5,
          textTransform: "uppercase",
        }}
      >
        Guia do preço de custo
      </Text>
    </View>
  );
}

function PageFooter() {
  return (
    <View fixed style={styles.footer}>
      <Text style={styles.footerText}>
        R21 CONSTRUTORA · BALNEÁRIO CAMBORIÚ/SC
      </Text>
      <Text style={styles.footerText}>R21.COM.BR</Text>
    </View>
  );
}

type Section = { id: string; titulo: string; paragrafos: string[] };

function Section({ s, risco }: { s: Section; risco?: boolean }) {
  return (
    <View wrap={false} style={{ marginBottom: 6 }}>
      <Text
        style={[styles.sectionTitle, risco ? styles.sectionTitleRisco : {}]}
      >
        {s.titulo}
      </Text>
      {s.paragrafos.map((p, i) => (
        <Text key={i} style={styles.paragraph}>
          {p}
        </Text>
      ))}
    </View>
  );
}

export function GuiaPdf() {
  return (
    <Document
      title={GUIA.titulo}
      author="R21 Construtora"
      subject={GUIA.subtitulo}
    >
      <Page size="A4" style={styles.cover}>
        <View>
          <MarkSvg size={48} color={COLORS.red} />
          <View style={{ height: 28 }} />
          <View style={styles.coverTopRule} />
          <Text style={styles.coverEyebrow}>Guia R21 para investidores</Text>
          <Text style={styles.coverTitle}>{GUIA.titulo}</Text>
          <Text style={styles.coverSubtitle}>{GUIA.subtitulo}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Text style={styles.coverFooter}>{GUIA.autor}</Text>
          <Text style={styles.coverFooter}>Versão {GUIA.versao}</Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <PageFooter />
        <Header />
        <Section s={GUIA.abertura} />
        <Section s={GUIA.comoFunciona} />
        <Section s={GUIA.vantagens} />
      </Page>

      <Page size="A4" style={styles.page}>
        <PageFooter />
        <Header />
        <Section s={GUIA.desvantagens} risco />

        <View style={styles.checklistBox} wrap={false}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Helvetica-Bold",
              color: COLORS.black,
              marginBottom: 6,
            }}
          >
            {GUIA.checklist.titulo}
          </Text>
          <Text style={styles.checklistIntro}>{GUIA.checklist.intro}</Text>
          {GUIA.checklist.itens.map((item, i) => (
            <View key={item.id} style={styles.checklistRow}>
              <Text style={styles.checklistBadge}>{i + 1}</Text>
              <Text style={styles.checklistText}>{item.pergunta}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 18 }} wrap={false}>
          <Text style={styles.sectionTitle}>{GUIA.fechamento.titulo}</Text>
          {GUIA.fechamento.paragrafos.map((p, i) => (
            <Text key={i} style={styles.paragraph}>
              {p}
            </Text>
          ))}
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <View
              style={{
                backgroundColor: COLORS.red,
                color: COLORS.white,
                paddingVertical: 8,
                paddingHorizontal: 14,
                borderRadius: 4,
                marginRight: 10,
              }}
            >
              <Text style={{ fontSize: 10, fontFamily: "Helvetica-Bold" }}>
                Calcule sua valorização: r21.com.br/calculadora
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
