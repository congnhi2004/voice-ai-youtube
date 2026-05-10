import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16 text-slate-950">
      <div className="w-full max-w-4xl">
        <p className="text-sm font-semibold tracking-[0.18em] text-violet-700 uppercase">
          AI Voice Studio
        </p>
        <h1 className="mt-5 max-w-2xl text-4xl leading-tight font-extrabold tracking-normal sm:text-6xl">
          Generate natural speech from your own text and voices.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
          The auth foundation is ready. Sign in to continue building the voice
          project workflow.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            className="inline-flex h-11 items-center justify-center rounded-md bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-black"
            href="/auth/sign-in"
          >
            Sign In
          </Link>
          <Link
            className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-950 transition hover:border-slate-400"
            href="/auth/sign-up"
          >
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
}
