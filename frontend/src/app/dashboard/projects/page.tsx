import { Music, Plus, Search } from "lucide-react";
import Link from "next/link";

import { Card } from "../_components/dashboard-shell";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <h1 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
            Your Audio Projects
          </h1>
          <p className="text-muted-foreground text-base">
            Manage and organize all your text-to-speech audio (0 audios)
          </p>
        </div>
        <Link
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center justify-center gap-2 self-start rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-all sm:self-auto"
          href="/dashboard/create"
        >
          <Plus className="h-4 w-4" />
          New Audio
        </Link>
      </div>

      <Card>
        <div className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <input
                className="border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 pl-9 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-3 md:text-sm"
                placeholder="Search audio projects..."
              />
            </div>
            <select className="border-input bg-background rounded-md border px-3 py-2 text-sm">
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="name">Text A-Z</option>
            </select>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <div className="relative mb-6">
            <div className="border-muted bg-muted/20 flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed">
              <Music className="text-muted-foreground h-10 w-10" />
            </div>
          </div>
          <h3 className="mb-2 text-xl font-semibold">No audio projects yet</h3>
          <p className="text-muted-foreground mb-6 max-w-md text-sm">
            Start creating text-to-speech audio to see them here.
          </p>
          <Link
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs transition-all"
            href="/dashboard/create"
          >
            <Plus className="h-4 w-4" />
            Create Your First Audio
          </Link>
        </div>
      </Card>
    </div>
  );
}
