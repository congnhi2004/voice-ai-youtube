import { Laptop } from "lucide-react";
import { type ReactNode } from "react";

import { Card } from "../_components/dashboard-shell";

function SettingsCard({
  buttonLabel,
  children,
  description,
  footer,
  title,
}: {
  buttonLabel?: string;
  children?: ReactNode;
  description: string;
  footer?: ReactNode;
  title: string;
}) {
  return (
    <Card className="w-full pb-0 text-start">
      <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6">
        <div className="text-lg font-semibold md:text-xl">{title}</div>
        <div className="text-muted-foreground text-xs md:text-sm">
          {description}
        </div>
      </div>
      {children ? <div className="px-6">{children}</div> : null}
      <div className="bg-sidebar flex flex-col items-center justify-between gap-4 rounded-b-xl border-t px-6 py-4 md:flex-row">
        {footer ?? (
          <div className="text-muted-foreground text-center text-xs md:text-start md:text-sm">
            Changes are saved to your account.
          </div>
        )}
        {buttonLabel ? (
          <button
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-8 items-center justify-center gap-1.5 rounded-md px-3 text-sm font-medium whitespace-nowrap shadow-xs transition-all md:ms-auto"
            type="button"
          >
            {buttonLabel}
          </button>
        ) : null}
      </div>
    </Card>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          Account Settings
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your account preferences and security settings
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex w-full max-w-2xl flex-col gap-4 md:gap-6">
          <SettingsCard
            buttonLabel="Save"
            description="Please enter your full name, or a display name."
            footer={
              <div className="text-muted-foreground text-center text-xs md:text-start md:text-sm">
                Please use 32 characters at maximum.
              </div>
            }
            title="Name"
          >
            <input
              className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-3 md:text-sm"
              defaultValue="Voice Creator"
              placeholder="Name"
              type="text"
            />
          </SettingsCard>

          <SettingsCard
            buttonLabel="Save"
            description="Enter the email address you want to use to log in."
            footer={
              <div className="text-muted-foreground text-center text-xs md:text-start md:text-sm">
                Please enter a valid email address.
              </div>
            }
            title="Email"
          >
            <input
              className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-3 md:text-sm"
              defaultValue="creator@voice.ai"
              placeholder="m@example.com"
              type="email"
            />
          </SettingsCard>
        </div>

        <div className="flex w-full max-w-2xl flex-col gap-4 md:gap-6">
          <SettingsCard
            buttonLabel="Set Password"
            description="Click the button below to receive an email to set up a password for your account."
            title="Set Password"
          />

          <Card className="w-full pb-0 text-start">
            <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6">
              <div className="text-lg font-semibold md:text-xl">Sessions</div>
              <div className="text-muted-foreground text-xs md:text-sm">
                Manage your active sessions and revoke access.
              </div>
            </div>
            <div className="grid gap-4 px-6">
              <div className="border-border bg-card flex flex-row items-center gap-3 rounded-xl border px-4 py-3 shadow-sm">
                <Laptop className="size-4" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">Current Session</span>
                  <span className="text-muted-foreground text-xs">
                    Linux, Chrome
                  </span>
                </div>
                <button
                  className="border-border bg-background hover:bg-muted relative ms-auto inline-flex h-8 items-center justify-center gap-1.5 rounded-md border px-3 text-sm font-medium whitespace-nowrap shadow-xs transition-all"
                  type="button"
                >
                  Sign Out
                </button>
              </div>
            </div>
            <div className="bg-sidebar flex flex-col items-center justify-between gap-4 rounded-b-xl border-t px-6 py-4 md:flex-row" />
          </Card>
        </div>
      </div>
    </div>
  );
}
