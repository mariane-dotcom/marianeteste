import { cookies } from "next/headers";

const COOKIE = "r21_admin";

export async function isAuthed(): Promise<boolean> {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;
  const c = await cookies();
  return c.get(COOKIE)?.value === token;
}

export async function loginCom(tokenRecebido: string): Promise<boolean> {
  const token = process.env.ADMIN_TOKEN;
  if (!token || tokenRecebido !== token) return false;
  const c = await cookies();
  c.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return true;
}

export async function logout() {
  const c = await cookies();
  c.delete(COOKIE);
}
