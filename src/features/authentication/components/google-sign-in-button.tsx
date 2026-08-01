import { signIn } from "@/auth";

export function GoogleSignInButton() {
  return (
    <form
      action={async () => {
        "use server";

        await signIn("google", {
          redirectTo: "/",
        });
      }}
    >
      <button
        type="submit"
        className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-zinc-100 px-4 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white"
      >
        Continuar com Google
      </button>
    </form>
  );
}