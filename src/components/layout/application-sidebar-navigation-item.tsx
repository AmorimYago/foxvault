import { type NavigationItem } from "@/types/navigation-item";

type ApplicationSidebarNavigationItemProps = {
  item: NavigationItem;
};

export function ApplicationSidebarNavigationItem({
  item,
}: ApplicationSidebarNavigationItemProps) {
  const Icon = item.icon;

  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-950"
    >
      <Icon size={18} />

      <span>{item.label}</span>
    </button>
  );
}