import Link from "next/link";

import { type NavigationItem } from "@/types/navigation-item";

type ApplicationSidebarNavigationItemProps = {
  item: NavigationItem;
};

export function ApplicationSidebarNavigationItem({
  item,
}: ApplicationSidebarNavigationItemProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
    >
      <Icon className="size-4.5 shrink-0" />

      <span>{item.label}</span>
    </Link>
  );
}