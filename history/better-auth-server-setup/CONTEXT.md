# Better Auth Server Setup Context

## Locked Decisions

- D1: This first slice is server/API setup only. Do not implement sign-in, sign-up, or account UI in this slice.
- D2: Use the existing Next.js App Router frontend and existing Prisma/PostgreSQL stack.
- D3: Mount Better Auth under the standard `/api/auth/[...all]` route.
- D4: Enable basic email/password auth for the initial server capability. Social providers are deferred.
- D5: Keep OAuth/client UI availability out of scope until a later UI slice.

## Code Context

- `frontend/package.json` already includes `better-auth`.
- `frontend/prisma/schema.prisma` owns the Prisma schema and uses PostgreSQL.
- `frontend/src/server/db.ts` exports the existing Prisma client.
- `frontend/src/env.js` owns validated server environment variables.

## Verification Target

- Prisma schema validates.
- Prisma client generates.
- TypeScript check passes.
- Next.js production build includes `/api/auth/[...all]`.
