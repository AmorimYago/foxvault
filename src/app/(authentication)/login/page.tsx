import { GoogleSignInButton } from "@/features/authentication/components/google-sign-in-button";

export default function LoginPage() {
  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
      <div className="text-center">
        <div className="text-4xl" aria-hidden="true">
          🦊
        </div>

        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-100">
          FoxVault
        </h1>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Entre para acessar suas galerias e imagens.
        </p>
      </div>

      <div className="mt-8">
        <GoogleSignInButton />
      </div>

      <p className="mt-6 text-center text-xs leading-5 text-zinc-500">
        O login com Discord será adicionado futuramente.
      </p>
    </section>
  );
}