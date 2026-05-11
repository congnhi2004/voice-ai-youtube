"use client";

import { AuthProvider } from "@better-auth-ui/heroui";
import { useRouter } from "next/navigation";
import { type ReactNode } from "react";

import { authClient } from "~/lib/auth-client";
import { getQueryClient } from "~/lib/query-client";

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  const queryClient = getQueryClient();

  return (
    <AuthProvider
      authClient={authClient}
      basePaths={{ auth: "/auth", settings: "/settings" }}
      emailAndPassword={{
        confirmPassword: true,
        forgotPassword: false,
      }}
      navigate={({ to, replace }) =>
        replace ? router.replace(to) : router.push(to)
      }
      queryClient={queryClient}
      redirectTo="/dashboard"
    >
      {children}
    </AuthProvider>
  );
}
