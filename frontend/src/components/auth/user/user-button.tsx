"use client";

import { useAuth, useSession } from "@better-auth-ui/react";
import {
  ChevronsUpDown,
  LogIn,
  LogOut,
  Settings,
  UserPlus2,
} from "lucide-react";
import Link from "next/link";
import { isValidElement, type ReactElement, type ReactNode } from "react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";
import { UserAvatar } from "./user-avatar";
import { UserView } from "./user-view";

export type UserButtonLinkVisibility =
  | "always"
  | "authenticated"
  | "unauthenticated";

export type UserButtonLink = {
  href: string;
  icon?: ReactNode;
  label: ReactNode;
  variant?: "default" | "destructive";
  visibility?: UserButtonLinkVisibility;
};

export type UserButtonProps = {
  align?: "center" | "end" | "start";
  className?: string;
  hideSettings?: boolean;
  links?: (ReactElement | UserButtonLink)[];
  side?: "bottom" | "left" | "right" | "top";
  sideOffset?: number;
  size?: "default" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "outline"
    | "secondary";
};

function renderUserLink(link: ReactElement | UserButtonLink, key: string) {
  if (isValidElement(link)) return link;

  const { href, icon, label, variant } = link;

  return (
    <DropdownMenuItem asChild key={key} variant={variant}>
      <Link href={href}>
        {icon}
        {label}
      </Link>
    </DropdownMenuItem>
  );
}

export function UserButton({
  align = "center",
  className,
  hideSettings = false,
  links,
  side = "bottom",
  sideOffset = 4,
  size = "default",
  variant = "ghost",
}: UserButtonProps) {
  const { authClient, basePaths, localization, plugins, viewPaths } = useAuth();
  const { data: session, isPending: sessionPending } = useSession(authClient);

  const userLinks = links?.flatMap((link, index) => {
    if (!isValidElement(link)) {
      const visibility = link.visibility ?? "always";

      if (visibility === "authenticated" && !session) return [];
      if (visibility === "unauthenticated" && session) return [];
    }

    return [renderUserLink(link, `user-button-link-${index.toString()}`)];
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild={size === "default"}
        className={cn(size === "icon" && "rounded-full", className)}
      >
        {size === "icon" ? (
          <UserAvatar />
        ) : (
          <Button
            className={cn("h-auto py-2.5 font-normal", className)}
            size="lg"
            variant={variant}
          >
            {session || sessionPending ? (
              <UserView />
            ) : (
              <>
                <UserAvatar />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {localization.auth.account}
                </div>
              </>
            )}
            <ChevronsUpDown className="ml-auto" />
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        className="w-[--radix-dropdown-menu-trigger-width] max-w-64 min-w-56"
        onCloseAutoFocus={(event) => event.preventDefault()}
        side={side}
        sideOffset={sideOffset}
      >
        {session ? (
          <>
            <DropdownMenuLabel className="p-2 text-sm font-normal">
              <UserView />
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {userLinks}
            {!hideSettings ? (
              <DropdownMenuItem asChild>
                <Link
                  href={`${basePaths.settings}/${viewPaths.settings.account}`}
                >
                  <Settings className="text-muted-foreground" />
                  {localization.settings.settings}
                </Link>
              </DropdownMenuItem>
            ) : null}
            {plugins.flatMap((plugin) =>
              plugin.userMenuItems?.map((Item, index) => (
                <Item key={`${plugin.id}-${index.toString()}`} />
              )),
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`${basePaths.auth}/${viewPaths.auth.signOut}`}>
                <LogOut className="text-muted-foreground" />
                {localization.auth.signOut}
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            {userLinks}
            <DropdownMenuItem asChild>
              <Link href={`${basePaths.auth}/${viewPaths.auth.signIn}`}>
                <LogIn className="text-muted-foreground" />
                {localization.auth.signIn}
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`${basePaths.auth}/${viewPaths.auth.signUp}`}>
                <UserPlus2 className="text-muted-foreground" />
                {localization.auth.signUp}
              </Link>
            </DropdownMenuItem>
            {plugins.flatMap((plugin) =>
              plugin.userMenuItems?.map((Item, index) => (
                <Item key={`${plugin.id}-${index.toString()}`} />
              )),
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
