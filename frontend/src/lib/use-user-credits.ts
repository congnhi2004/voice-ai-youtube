"use client";

import { useAuth, useSession } from "@better-auth-ui/react";
import { useEffect, useState } from "react";

type CreditsResponse = {
  credits: number;
};

export function useUserCredits() {
  const { authClient } = useAuth();
  const { data: session, isPending: sessionPending } = useSession(authClient);
  const userId = session?.user.id;
  const [credits, setCredits] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (sessionPending) return;

    if (!userId) {
      setCredits(0);
      setIsLoading(false);
      setHasError(false);
      return;
    }

    const abortController = new AbortController();

    async function loadCredits() {
      setIsLoading(true);
      setHasError(false);

      try {
        const response = await fetch("/api/user/credits", {
          cache: "no-store",
          credentials: "include",
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error("Unable to load credits");
        }

        const data = (await response.json()) as CreditsResponse;
        setCredits(data.credits);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setHasError(true);
        setCredits(0);
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadCredits();

    return () => abortController.abort();
  }, [sessionPending, userId]);

  return { credits, hasError, isLoading };
}
