"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useMemo, useState } from "react";

import { authClient } from "~/lib/auth-client";

export type AuthPath = "sign-in" | "sign-up";

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
    return "/";
  }

  return value;
}

export function AuthForm({ path }: { path: AuthPath }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = useMemo(
    () => getRedirectPath(searchParams.get("redirectTo")),
    [searchParams],
  );
  const isSignUp = path === "sign-up";
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
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.10)]">
      <div className="mb-5">
        <h2 className="text-base font-bold text-slate-950">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>
        <p className="mt-2 text-xs leading-5 text-slate-500">
          {isSignUp
            ? "Create your account to start generating natural voices"
            : "Enter your email below to login to your account"}
        </p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        {isSignUp ? (
          <label className="block">
            <span className="text-xs font-semibold text-slate-950">Name</span>
            <input
              autoComplete="name"
              className="mt-2 h-8 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-950 transition outline-none placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
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
          </label>
        ) : null}

        <label className="block">
          <span className="text-xs font-semibold text-slate-950">Email</span>
          <input
            autoComplete="email"
            className="mt-2 h-8 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-950 transition outline-none placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
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
        </label>

        <label className="block">
          <span className="flex items-center justify-between gap-4 text-xs font-semibold text-slate-950">
            Password
            {!isSignUp ? (
              <button
                className="text-[0.68rem] font-medium text-slate-950 underline decoration-slate-300 underline-offset-2"
                onClick={() =>
                  setError("Password reset email is not configured yet.")
                }
                type="button"
              >
                Forgot your password?
              </button>
            ) : null}
          </span>
          <input
            autoComplete={isSignUp ? "new-password" : "current-password"}
            className="mt-2 h-8 w-full rounded-md border border-slate-200 bg-white px-3 text-xs text-slate-950 transition outline-none placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            minLength={8}
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
        </label>

        {error ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs leading-5 text-red-700">
            {error}
          </p>
        ) : null}

        <button
          className="mt-1 flex h-8 w-full items-center justify-center rounded-md bg-[#111111] px-4 text-xs font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={pending}
          type="submit"
        >
          {pending ? "Please wait..." : isSignUp ? "Create account" : "Login"}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-slate-500">
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <Link
          className="font-semibold text-slate-950 underline decoration-slate-300 underline-offset-2"
          href={isSignUp ? "/auth/sign-in" : "/auth/sign-up"}
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </Link>
      </p>
    </div>
  );
}
