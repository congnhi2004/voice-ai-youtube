import { NextResponse } from "next/server";

import { auth } from "~/lib/auth";
import { getUserCredits } from "~/server/credits";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json({ credits: 0 }, { status: 401 });
  }

  const credits = await getUserCredits(session.user.id);

  return NextResponse.json({ credits });
}
