type AnyWin = Window &
  typeof globalThis & {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };

export function trackLead(payload: { score: number; classificacao: string }) {
  if (typeof window === "undefined") return;
  const w = window as AnyWin;
  try {
    w.gtag?.("event", "generate_lead", {
      value: payload.score,
      classificacao: payload.classificacao,
    });
  } catch {}
  try {
    w.fbq?.("track", "Lead", { value: payload.score });
  } catch {}
}
