import { type LucideIcon } from "lucide-react";

type DashboardStatCardProps = {
  title: string;
  value: string;
  icon: LucideIcon;
};

export function DashboardStatCard({
  title,
  value,
  icon: Icon,
}: DashboardStatCardProps) {
  return (
    <article className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:shadow-lg hover:shadow-black/10">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-zinc-400 transition-colors group-hover:text-zinc-300">
          {title}
        </span>

        <div className="flex size-9 items-center justify-center rounded-lg bg-orange-500/10 transition-colors group-hover:bg-orange-500/15">
          <Icon
            aria-hidden="true"
            className="size-4.5 text-orange-500"
          />
        </div>
      </div>

      <p className="mt-4 text-3xl font-bold tracking-tight text-zinc-100">
        {value}
      </p>
    </article>
  );
}