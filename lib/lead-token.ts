import { createHmac, timingSafeEqual } from "crypto";

const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 dias

function secret(): string {
  const s = process.env.LEAD_TOKEN_SECRET || process.env.NEXTAUTH_SECRET;
  if (!s) {
    throw new Error("LEAD_TOKEN_SECRET não configurado");
  }
  return s;
}

function b64url(buf: Buffer | string): string {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/=+$/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function b64urlDecode(s: string): Buffer {
  const pad = "=".repeat((4 - (s.length % 4)) % 4);
  const norm = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  return Buffer.from(norm, "base64");
}

export function signLeadToken(leadId: string): string {
  const exp = Date.now() + TOKEN_TTL_MS;
  const payload = `${leadId}.${exp}`;
  const mac = createHmac("sha256", secret()).update(payload).digest();
  return `${b64url(payload)}.${b64url(mac)}`;
}

export function verifyLeadToken(
  token: string,
): { leadId: string } | null {
  const [payloadB64, macB64] = token.split(".");
  if (!payloadB64 || !macB64) return null;
  let payload: string;
  let mac: Buffer;
  try {
    payload = b64urlDecode(payloadB64).toString("utf8");
    mac = b64urlDecode(macB64);
  } catch {
    return null;
  }
  const expected = createHmac("sha256", secret()).update(payload).digest();
  if (mac.length !== expected.length) return null;
  if (!timingSafeEqual(mac, expected)) return null;
  const [leadId, expStr] = payload.split(".");
  const exp = Number(expStr);
  if (!leadId || !Number.isFinite(exp)) return null;
  if (Date.now() > exp) return null;
  return { leadId };
}
