import { db } from "~/server/db";

export const INITIAL_USER_CREDITS = 10;

export async function getUserCredits(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { credit: true },
  });

  return user?.credit ?? 0;
}
