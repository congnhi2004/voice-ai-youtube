"use client";

import {
  type UsernameAuthClient,
  useAuth,
  useSession,
} from "@better-auth-ui/react";
import type { User } from "better-auth";
import { User2 } from "lucide-react";
import type { ReactNode } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/lib/utils";

export type UserAvatarProps = {
  className?: string;
  fallback?: ReactNode;
  isPending?: boolean;
  user?: User & { displayUsername?: string | null; username?: string | null };
};

export function UserAvatar({
  className,
  fallback,
  isPending,
  user,
}: UserAvatarProps) {
  const { authClient } = useAuth();
  const { data: session, isPending: sessionPending } = useSession(
    authClient as UsernameAuthClient,
    { enabled: !user && !isPending },
  );

  if ((isPending || sessionPending) && !user) {
    return <Skeleton className={cn("size-8 rounded-full", className)} />;
  }

  const resolvedUser = user ?? session?.user;
  const initials = (
    resolvedUser?.username ??
    resolvedUser?.name ??
    resolvedUser?.email
  )
    ?.slice(0, 2)
    .toUpperCase();

  return (
    <Avatar
      className={cn(
        "bg-muted text-foreground size-8 rounded-full text-sm",
        className,
      )}
    >
      <AvatarImage
        alt={
          resolvedUser?.displayUsername ??
          resolvedUser?.name ??
          resolvedUser?.email ??
          "User"
        }
        src={resolvedUser?.image ?? undefined}
      />
      <AvatarFallback delayMs={resolvedUser?.image ? 600 : undefined}>
        {fallback ?? initials ?? <User2 className="size-4" />}
      </AvatarFallback>
    </Avatar>
  );
}
