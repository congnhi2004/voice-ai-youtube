"use client";

import { useSignOut } from "@better-auth-ui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useMemo, useState } from "react";

import { authClient } from "~/lib/auth-client";

export type AuthPath = "forgot-password" | "sign-in" | "sign-out" | "sign-up";

type FormState = {
  email: string;
  name: string;
  password: string;
};

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Authentication failed. Please try again.";
}

function getRedirectPath(value: string | null) {
  if (!value?.startsWith("/")) {
    return "/dashboard";
  }

  return value;
}

function SignOutView() {
  const router = useRouter();
  const {
    error,
    isPending,
    mutate: signOut,
  } = useSignOut(authClient, {
    onSuccess: () => {
      router.replace("/auth/sign-in");
      router.refresh();
    },
  });

  useEffect(() => {
    signOut();
  }, [signOut]);

  return (
    <main className="auth-page container flex grow flex-col items-center justify-center self-center p-4 md:p-6">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 text-center text-slate-950 shadow-sm">
        <h2 className="text-lg font-semibold">Signing out</h2>
        <p className="text-sm text-slate-500">
          {isPending ? "Please wait..." : "Redirecting to sign in."}
        </p>
        {error ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm leading-5 text-red-700">
            {error.message}
          </p>
        ) : null}
      </div>
    </main>
  );
}

type EmailAuthPath = Exclude<AuthPath, "sign-out">;

function EmailAuthForm({ path }: { path: EmailAuthPath }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = useMemo(
    () => getRedirectPath(searchParams.get("redirectTo")),
    [searchParams],
  );
  const isSignUp = path === "sign-up";
  const isForgotPassword = path === "forgot-password";

  const [form, setForm] = useState<FormState>({
    email: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    if (isForgotPassword) {
      setError("Password reset email is not configured yet.");
      setPending(false);
      return;
    }

    try {
      const result = isSignUp
        ? await authClient.signUp.email({
            callbackURL: redirectTo,
            email: form.email,
            name: form.name,
            password: form.password,
          })
        : await authClient.signIn.email({
            callbackURL: redirectTo,
            email: form.email,
            password: form.password,
            rememberMe: true,
          });

      if (result.error) {
        throw new Error(result.error.message ?? "Invalid email or password.");
      }

      router.push(redirectTo);
      router.refresh();
    } catch (caughtError) {
      setError(getErrorMessage(caughtError));
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="auth-page container flex grow flex-col items-center justify-center self-center p-4 md:p-6">
      <div className="flex w-full max-w-sm flex-col gap-6 rounded-xl border border-slate-200 bg-white py-6 text-slate-950 shadow-sm">
        <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6">
          <div className="text-lg font-semibold md:text-xl">
            {isForgotPassword
              ? "Forgot Password"
              : isSignUp
                ? "Sign Up"
                : "Sign In"}
          </div>
          <div className="text-xs text-slate-500 md:text-sm">
            {isForgotPassword
              ? "Enter your email below to reset your password"
              : isSignUp
                ? "Create your account to start generating natural voices"
                : "Enter your email below to login to your account"}
          </div>
        </div>

        <div className="grid gap-6 px-6">
          <div className="grid gap-4">
            <form className="grid w-full gap-6" noValidate onSubmit={onSubmit}>
              {isSignUp ? (
                <div className="grid gap-2">
                  <label
                    className="flex items-center gap-2 text-sm leading-none font-medium select-none"
                    htmlFor="auth-name"
                  >
                    Name
                  </label>
                  <input
                    autoComplete="name"
                    className="flex h-9 w-full min-w-0 rounded-md border border-slate-200 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-slate-500 focus-visible:border-slate-400 focus-visible:ring-3 focus-visible:ring-slate-300/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    id="auth-name"
                    name="name"
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Your name"
                    required
                    type="text"
                    value={form.name}
                  />
                </div>
              ) : null}

              <div className="grid gap-2">
                <label
                  className="flex items-center gap-2 text-sm leading-none font-medium select-none"
                  htmlFor="auth-email"
                >
                  Email
                </label>
                <input
                  autoComplete="email"
                  className="flex h-9 w-full min-w-0 rounded-md border border-slate-200 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-slate-500 focus-visible:border-slate-400 focus-visible:ring-3 focus-visible:ring-slate-300/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  id="auth-email"
                  name="email"
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  placeholder="m@example.com"
                  required
                  type="email"
                  value={form.email}
                />
              </div>

              {!isForgotPassword ? (
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <label
                      className="flex items-center gap-2 text-sm leading-none font-medium select-none"
                      htmlFor="auth-password"
                    >
                      Password
                    </label>
                    {!isSignUp ? (
                      <Link
                        className="text-sm hover:underline"
                        href="/auth/forgot-password"
                      >
                        Forgot your password?
                      </Link>
                    ) : null}
                  </div>
                  <div className="relative">
                    <input
                      autoComplete={
                        isSignUp ? "new-password" : "current-password"
                      }
                      className="flex h-9 w-full min-w-0 rounded-md border border-slate-200 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-slate-500 focus-visible:border-slate-400 focus-visible:ring-3 focus-visible:ring-slate-300/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      id="auth-password"
                      minLength={8}
                      name="password"
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          password: event.target.value,
                        }))
                      }
                      placeholder="Password"
                      required
                      type="password"
                      value={form.password}
                    />
                  </div>
                </div>
              ) : null}

              {error ? (
                <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm leading-5 text-red-700">
                  {error}
                </p>
              ) : null}

              <button
                className="inline-flex h-9 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-[#1a1a1a] px-4 py-2 text-sm font-medium whitespace-nowrap text-white shadow-xs transition-all hover:bg-[#262626] disabled:pointer-events-none disabled:opacity-50"
                disabled={pending}
                type="submit"
              >
                {pending
                  ? "Please wait..."
                  : isForgotPassword
                    ? "Send Reset Link"
                    : isSignUp
                      ? "Create account"
                      : "Login"}
              </button>
            </form>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 px-6 text-sm text-slate-500">
          {isForgotPassword
            ? "Remember your password?"
            : isSignUp
              ? "Already have an account?"
              : "Don't have an account?"}
          <Link
            className="text-slate-950 underline underline-offset-4 hover:underline"
            href={
              isForgotPassword || isSignUp ? "/auth/sign-in" : "/auth/sign-up"
            }
          >
            {isForgotPassword || isSignUp ? "Sign In" : "Sign Up"}
          </Link>
        </div>
      </div>
    </main>
  );
}

export function AuthForm({ path }: { path: AuthPath }) {
  if (path === "sign-out") {
    return <SignOutView />;
  }

  return <EmailAuthForm path={path} />;
}
