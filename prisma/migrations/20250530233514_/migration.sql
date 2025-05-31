/*
  Warnings:

  - You are about to drop the `EmailVerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastVerificationEmailSentAt" TIMESTAMP(3);

-- DropTable
DROP TABLE "EmailVerificationToken";
