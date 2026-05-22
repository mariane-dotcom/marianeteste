import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE_NAME = "r21_admin";
const TTL_MS = 1000 * 60 * 60 * 12; // 12h

function secret(): string {
  const s = process.env.LEAD_TOKEN_SECRET;
  if (!s) throw new Error("LEAD_TOKEN_SECRET ausente");
  return s;
}

function adminPassword(): string | null {
  return process.env.ADMIN_PASSWORD || null;
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

export function buildSessionToken(): string {
  const exp = Date.now() + TTL_MS;
  const payload = `admin.${exp}`;
  const mac = createHmac("sha256", secret()).update(payload).digest();
  return `${b64url(payload)}.${b64url(mac)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [pB64, mB64] = token.split(".");
  if (!pB64 || !mB64) return false;
  let payload: string;
  let mac: Buffer;
  try {
    payload = b64urlDecode(pB64).toString("utf8");
    mac = b64urlDecode(mB64);
  } catch {
    return false;
  }
  const expected = createHmac("sha256", secret()).update(payload).digest();
  if (mac.length !== expected.length) return false;
  if (!timingSafeEqual(mac, expected)) return false;
  const [tag, expStr] = payload.split(".");
  if (tag !== "admin") return false;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  return true;
}

export function checkPassword(input: string): boolean {
  const expected = adminPassword();
  if (!expected) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export const ADMIN_COOKIE = COOKIE_NAME;

export async function requireAdminOrRedirect() {
  const c = await cookies();
  const token = c.get(COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }
}
