-- Set the starting balance for newly created users.
ALTER TABLE "User" ALTER COLUMN "credit" SET DEFAULT 10;

-- Existing users were created before credits were database-backed in the UI.
UPDATE "User" SET "credit" = 10 WHERE "credit" = 0;
