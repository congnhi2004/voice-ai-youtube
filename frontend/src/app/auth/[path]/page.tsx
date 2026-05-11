import { notFound } from "next/navigation";

import { AuthForm, type AuthPath } from "./auth-form";

const authPaths = [
  "forgot-password",
  "sign-in",
  "sign-out",
  "sign-up",
] satisfies AuthPath[];

export default async function AuthPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path } = await params;

  if (!authPaths.includes(path as AuthPath)) {
    notFound();
  }

  return <AuthForm path={path as AuthPath} />;
}
