"use client";

import {
  Calendar,
  Coins,
  Crown,
  FolderOpen,
  LayoutDashboard,
  Menu,
  Music,
  PanelLeft,
  Search,
  Settings,
  Sparkles,
  User,
  WandSparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useMemo, useState } from "react";

import { UserButton } from "~/components/auth/user/user-button";
import { Button } from "~/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "~/components/ui/breadcrumb";

type NavItem = {
  href: string;
  icon: LucideIcon;
  label: string;
};

const navItems: NavItem[] = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/create", icon: WandSparkles, label: "Create" },
  { href: "/dashboard/projects", icon: FolderOpen, label: "Projects" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

function getPageTitle(pathname: string) {
  if (pathname.startsWith("/dashboard/create")) return "Create";
  if (pathname.startsWith("/dashboard/customer-portal")) {
    return "Customer Portal";
  }
  if (pathname.startsWith("/dashboard/projects")) return "Projects";
  if (pathname.startsWith("/dashboard/settings")) return "Settings";
  return "Dashboard";
}

function isActivePath(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === href;
  return pathname.startsWith(href);
}

function SidebarContent({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="bg-sidebar flex h-full w-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto px-3">
        <div className="relative flex w-full min-w-0 flex-col p-2">
          <div
            className={`text-primary mt-3 mb-9 flex h-11 shrink-0 flex-col items-start justify-start rounded-md px-2 text-xs font-medium transition-opacity duration-200 ${
              collapsed ? "opacity-0" : "opacity-100"
            }`}
          >
            <Link
              className="mb-0.5 flex cursor-pointer items-center gap-2.5"
              href="/"
              onClick={onNavigate}
            >
              <Sparkles className="text-primary h-7 w-7" />
              <p className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-[1.65rem] leading-8 font-bold tracking-tight text-transparent">
                AI Voice
              </p>
            </Link>
            <p className="text-muted-foreground ml-9 text-base leading-5 font-medium tracking-wide">
              Studio
            </p>
          </div>

          <div className="w-full text-base">
            <ul className="flex w-full min-w-0 flex-col gap-1 space-y-1">
              {navItems.map((item) => {
                const active = isActivePath(pathname, item.href);
                const Icon = item.icon;

                return (
                  <li key={item.href} className="group/menu-item relative">
                    <Link
                      className={`group hover:bg-primary/10 hover:text-primary relative flex h-11 w-full cursor-pointer items-center gap-3 overflow-hidden rounded-lg px-3.5 py-2.5 text-left text-base font-medium outline-hidden transition-all duration-200 focus-visible:ring-2 ${
                        active
                          ? "bg-primary/15 text-primary shadow-sm"
                          : "text-sidebar-foreground"
                      } ${collapsed ? "justify-center px-2" : "justify-start"}`}
                      href={item.href}
                      onClick={onNavigate}
                    >
                      <Icon
                        className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
                          active
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-primary"
                        }`}
                      />
                      {!collapsed ? (
                        <span className="truncate">{item.label}</span>
                      ) : null}
                      {active && !collapsed ? (
                        <div className="bg-primary absolute top-1/2 left-0 h-6 w-1 -translate-y-1/2 rounded-r-full" />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div
        className={`bg-muted/30 flex flex-col gap-2 border-t p-3 ${
          collapsed ? "items-center" : ""
        }`}
      >
        <div className="mb-3 flex w-full items-center justify-center gap-2 text-xs">
          <div className="group flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="relative">
                <Coins className="h-4 w-4 text-yellow-500 transition-colors duration-200 group-hover:text-yellow-400" />
                <Sparkles className="absolute -top-1 -right-1 h-2 w-2 text-yellow-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </div>
              {!collapsed ? (
                <div className="flex flex-col">
                  <span className="text-foreground text-sm font-bold transition-colors duration-200 group-hover:text-yellow-600">
                    10
                  </span>
                  <span className="text-muted-foreground text-xs leading-tight">
                    Credits
                  </span>
                </div>
              ) : null}
            </div>
          </div>

          {!collapsed ? (
            <button
              className="group relative ml-2 inline-flex h-8 items-center justify-center gap-1.5 overflow-hidden rounded-md border border-orange-400/50 bg-gradient-to-r from-orange-400/10 to-pink-500/10 px-3 text-sm font-medium whitespace-nowrap text-orange-400 shadow-xs transition-all duration-300 hover:border-orange-500/70 hover:from-orange-500 hover:to-pink-600 hover:text-white hover:shadow-lg hover:shadow-orange-500/25"
              type="button"
            >
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
                <span className="font-medium">Upgrade</span>
                <Sparkles className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </button>
          ) : null}
        </div>

        <UserButton
          align="center"
          className={
            collapsed
              ? "size-8"
              : "border-muted-foreground/20 hover:border-primary/50 w-full justify-start !p-2"
          }
          hideSettings
          links={[
            {
              href: "/dashboard/customer-portal",
              icon: <User className="text-muted-foreground" />,
              label: "Customer Portal",
              visibility: "authenticated",
            },
            {
              href: "/dashboard/settings",
              icon: <Settings className="text-muted-foreground" />,
              label: "Settings",
              visibility: "authenticated",
            },
          ]}
          side="top"
          sideOffset={8}
          size={collapsed ? "icon" : "default"}
          variant="outline"
        />
      </div>
    </div>
  );
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const pageTitle = useMemo(() => getPageTitle(pathname), [pathname]);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="bg-background text-foreground flex min-h-svh w-full">
      <div
        className={`relative hidden shrink-0 bg-transparent transition-[width] duration-200 ease-linear md:block ${
          collapsed ? "w-12" : "w-64"
        }`}
      />

      <aside
        className={`from-background to-muted/20 fixed inset-y-0 left-0 z-20 hidden h-svh bg-gradient-to-b transition-[width] duration-200 ease-linear md:flex ${
          collapsed ? "w-12" : "w-64"
        }`}
      >
        <SidebarContent collapsed={collapsed} />
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            aria-label="Close sidebar"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
            type="button"
          />
          <aside className="from-background to-muted/20 absolute inset-y-0 left-0 w-64 border-r bg-gradient-to-b shadow-xl">
            <Button
              aria-label="Close sidebar"
              className="absolute top-3 right-3 z-10 size-8"
              onClick={() => setMobileOpen(false)}
              size="icon"
              type="button"
              variant="ghost"
            >
              <X className="h-4 w-4" />
            </Button>
            <SidebarContent
              collapsed={false}
              onNavigate={() => setMobileOpen(false)}
            />
          </aside>
        </div>
      ) : null}

      <main className="bg-background relative flex h-screen w-full flex-1 flex-col">
        <header className="border-border/40 bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 border-b px-6 py-3 shadow-sm backdrop-blur">
          <div className="flex shrink-0 grow items-center gap-3">
            <Button
              className="-ml-1 size-8 md:hidden"
              size="icon"
              variant="ghost"
              onClick={() => setMobileOpen(true)}
              type="button"
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Open Sidebar</span>
            </Button>
            <Button
              className="-ml-1 hidden size-8 md:inline-flex"
              size="icon"
              variant="ghost"
              onClick={() => setCollapsed((current) => !current)}
              type="button"
            >
              <PanelLeft className="h-4 w-4" />
              <span className="sr-only">Toggle Sidebar</span>
            </Button>
            <div className="bg-border mr-2 h-6 w-px shrink-0" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <main className="from-background to-muted/20 flex-1 overflow-y-auto bg-gradient-to-br p-6">
          {children}
        </main>
      </main>
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`border-border bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  helper,
  tone,
}: {
  helper: string;
  icon: LucideIcon;
  label: string;
  tone: string;
  value: string;
}) {
  return (
    <Card className="relative overflow-hidden">
      <div className="flex flex-row items-center justify-between space-y-0 px-6 pb-2">
        <div className="text-sm font-medium">{label}</div>
        <Icon className={`h-4 w-4 ${tone}`} />
      </div>
      <div className="px-6">
        <div className={`text-2xl font-bold ${tone}`}>{value}</div>
        <p className="text-muted-foreground text-xs">{helper}</p>
      </div>
    </Card>
  );
}

export const dashboardIcons = {
  Calendar,
  Music,
  Search,
  Settings,
  Sparkles,
  WandSparkles,
};
