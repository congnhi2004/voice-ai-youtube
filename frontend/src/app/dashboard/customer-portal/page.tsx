import { Crown, Sparkles } from "lucide-react";

import { Card } from "../_components/dashboard-shell";

export default function CustomerPortalPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
          Customer Portal
        </h1>
        <p className="text-muted-foreground text-base">
          Manage your credits, billing, and plan details.
        </p>
      </div>

      <Card>
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="border-muted bg-muted/20 mb-5 flex size-20 items-center justify-center rounded-full border-2 border-dashed">
            <Crown className="size-9 text-yellow-500" />
          </div>
          <h2 className="mb-2 text-xl font-semibold">
            Billing portal is not connected yet
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md text-sm">
            The dashboard menu is wired. Connect your payment provider here when
            billing is ready.
          </p>
          <div className="inline-flex items-center gap-2 rounded-md border border-orange-400/50 bg-gradient-to-r from-orange-400/10 to-pink-500/10 px-4 py-2 text-sm font-medium text-orange-500">
            <Sparkles className="size-4" />
            10 credits available
          </div>
        </div>
      </Card>
    </div>
  );
}
