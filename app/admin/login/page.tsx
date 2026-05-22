import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  buildSessionToken,
  checkPassword,
} from "@/lib/admin-auth";

export const metadata = { title: "Admin · R21" };

type Props = {
  searchParams: Promise<{ error?: string }>;
};

async function login(formData: FormData) {
  "use server";
  const password = String(formData.get("password") || "");
  if (!checkPassword(password)) {
    redirect("/admin/login?error=1");
  }
  const token = buildSessionToken();
  const c = await cookies();
  c.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  redirect("/admin");
}

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams;
  return (
    <section className="mx-auto max-w-md px-6 py-20">
      <p className="text-xs uppercase tracking-widest text-r21-red font-medium">
        Admin R21
      </p>
      <h1 className="mt-3 text-3xl font-medium text-r21-black">
        Acesso restrito
      </h1>
      <form action={login} className="mt-8 space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-r21-gray-800 mb-1.5">
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoFocus
            required
            className="w-full rounded-md border border-r21-gray-200 bg-r21-white px-3 py-2.5 focus:outline-none focus:border-r21-red focus:ring-2 focus:ring-r21-red-50"
          />
        </div>
        {error && (
          <p className="text-sm text-r21-red-dark">Senha inválida.</p>
        )}
        <button
          type="submit"
          className="w-full inline-flex justify-center px-5 py-3 rounded-md bg-r21-red text-r21-white font-medium hover:bg-r21-red-dark transition-colors"
        >
          Entrar
        </button>
      </form>
      <p className="mt-6 text-xs text-r21-gray-500">
        <Link href="/" className="hover:underline">
          ← voltar ao site
        </Link>
      </p>
    </section>
  );
}
