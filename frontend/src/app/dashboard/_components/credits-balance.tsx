"use client";

import { Sparkles } from "lucide-react";

import { useUserCredits } from "~/lib/use-user-credits";
import { cn } from "~/lib/utils";

function formatCredits(credits: number | null, isLoading: boolean) {
  if (isLoading) return "...";
  return (credits ?? 0).toLocaleString();
}

export function SidebarCreditsAmount() {
  const { credits, isLoading } = useUserCredits();

  return (
    <span className="text-foreground text-sm font-bold transition-colors duration-200 group-hover:text-yellow-600">
      {formatCredits(credits, isLoading)}
    </span>
  );
}

export function CreditsAvailableBadge({ className }: { className?: string }) {
  const { credits, isLoading } = useUserCredits();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-orange-400/50 bg-gradient-to-r from-orange-400/10 to-pink-500/10 px-4 py-2 text-sm font-medium text-orange-500",
        className,
      )}
    >
      <Sparkles className="size-4" />
      {formatCredits(credits, isLoading)} credits available
    </div>
  );
}
