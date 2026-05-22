import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { loginCom } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin · acesso",
  robots: { index: false, follow: false },
};

export default async function LoginAdmin({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { erro } = await searchParams;

  async function entrar(formData: FormData) {
    "use server";
    const token = String(formData.get("token") ?? "");
    const ok = await loginCom(token);
    redirect(ok ? "/admin" : "/admin/login?erro=1");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-r21-paper px-6">
      <form action={entrar} className="bg-r21-white border border-r21-fog p-8 w-full max-w-sm">
        <p className="eyebrow">Painel R21</p>
        <h1 className="font-display text-2xl font-bold tracking-tightest mt-2 text-r21-black">Acesso restrito</h1>
        <p className="text-sm text-r21-graphite mt-2">
          Informe o token de administrador. Solicite ao time técnico se você ainda não tem.
        </p>
        <label className="block mt-6 text-sm">
          <span className="text-r21-graphite">Token</span>
          <input
            type="password"
            name="token"
            required
            autoFocus
            className="mt-1 w-full border border-r21-fog px-3 py-2.5 focus:outline-none focus:border-r21-red"
          />
        </label>
        {erro && <p className="mt-3 text-sm text-r21-red">Token inválido.</p>}
        <button type="submit" className="btn-primary w-full mt-6">Entrar</button>
      </form>
    </main>
  );
}
