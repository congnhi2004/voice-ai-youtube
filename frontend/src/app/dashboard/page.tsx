"use client";

import {
  Calendar,
  Mic,
  Music,
  Settings,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

import { Card, StatCard } from "./_components/dashboard-shell";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
          Welcome back, Voice Creator!
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg">
          Here&apos;s an overview of your Text-to-Speech workspace
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          helper="TTS generations"
          icon={Music}
          label="Total Audio"
          tone="text-purple-600"
          value="0"
        />
        <StatCard
          helper="Projects created"
          icon={Calendar}
          label="This Month"
          tone="text-blue-600"
          value="0"
        />
        <StatCard
          helper="Recent activity"
          icon={TrendingUp}
          label="This Week"
          tone="text-green-600"
          value="0"
        />
        <StatCard
          helper="Account created"
          icon={Star}
          label="Member Since"
          tone="text-yellow-600"
          value="May 2026"
        />
      </div>

      <Card>
        <div className="grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6">
          <div className="flex items-center gap-2 leading-none font-semibold">
            <Sparkles className="text-primary h-5 w-5" />
            Quick Actions
          </div>
        </div>
        <div className="px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              className="group inline-flex h-auto flex-col items-center justify-center gap-2 rounded-md bg-purple-600 p-6 text-sm font-medium whitespace-nowrap text-white shadow-xs transition-all hover:bg-purple-700"
              href="/dashboard/create"
            >
              <Mic className="h-8 w-8 transition-transform group-hover:scale-110" />
              <div className="text-center">
                <div className="font-semibold">Text-to-Speech</div>
                <div className="text-xs opacity-80">
                  Generate audio with voice cloning
                </div>
              </div>
            </Link>
            <Link
              className="group border-border bg-background hover:bg-muted inline-flex h-auto flex-col items-center justify-center gap-2 rounded-md border p-6 text-sm font-medium whitespace-nowrap shadow-xs transition-all"
              href="/dashboard/projects"
            >
              <Music className="h-8 w-8 transition-transform group-hover:scale-110" />
              <div className="text-center">
                <div className="font-semibold">View All Audio</div>
                <div className="text-xs opacity-70">
                  Browse your audio library
                </div>
              </div>
            </Link>
            <Link
              className="group border-border bg-background hover:bg-muted inline-flex h-auto flex-col items-center justify-center gap-2 rounded-md border p-6 text-sm font-medium whitespace-nowrap shadow-xs transition-all"
              href="/dashboard/settings"
            >
              <Settings className="h-8 w-8 transition-transform group-hover:scale-110" />
              <div className="text-center">
                <div className="font-semibold">Account Settings</div>
                <div className="text-xs opacity-70">Manage your profile</div>
              </div>
            </Link>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex flex-row items-center justify-between px-6">
          <div className="flex items-center gap-2 leading-none font-semibold">
            <Music className="h-5 w-5 text-purple-600" />
            Recent Audio Projects
          </div>
        </div>
        <div className="px-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="relative mb-4">
              <div className="border-muted bg-muted/20 flex h-20 w-20 items-center justify-center rounded-full border-2 border-dashed">
                <Music className="text-muted-foreground h-8 w-8" />
              </div>
            </div>
            <h3 className="mb-2 text-lg font-semibold">
              No audio projects yet
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Start generating speech with AI voice cloning
            </p>
            <Link
              className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium whitespace-nowrap text-white shadow-xs transition-all hover:bg-purple-700"
              href="/dashboard/create"
            >
              <Mic className="h-4 w-4" />
              Create Your First Audio
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
