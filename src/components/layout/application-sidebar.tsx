import {
  House,
  Images,
  Settings,
  Star,
  Trash2,
} from "lucide-react";

import { type NavigationItem } from "@/types/navigation-item";

import { ApplicationSidebarNavigationItem } from "./application-sidebar-navigation-item";
import { Logo } from "./logo";

const navigationItems: NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: House,
  },
  {
    id: "galleries",
    label: "Galleries",
    href: "/galleries",
    icon: Images,
  },
  {
    id: "favorites",
    label: "Favorites",
    href: "/favorites",
    icon: Star,
  },
  {
    id: "trash",
    label: "Trash",
    href: "/trash",
    icon: Trash2,
  },
];

const footerNavigationItems: NavigationItem[] = [
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function ApplicationSidebar() {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-neutral-200 bg-white">
      <div className="border-b border-neutral-200 px-6 py-5">
        <Logo />
      </div>

      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <ApplicationSidebarNavigationItem item={item} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-neutral-200 p-3">
        <ul className="space-y-1">
          {footerNavigationItems.map((item) => (
            <li key={item.id}>
              <ApplicationSidebarNavigationItem item={item} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}