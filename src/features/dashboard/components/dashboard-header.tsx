type DashboardHeaderProps = {
  userName: string;
};

export function DashboardHeader({
  userName,
}: DashboardHeaderProps) {
  return (
    <header className="space-y-2">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-100">
        Bem-vindo de volta, {userName} 👋
      </h1>

      <p className="text-sm text-zinc-400">
        Veja o que está acontecendo no seu cofre hoje.
      </p>
    </header>
  );
}