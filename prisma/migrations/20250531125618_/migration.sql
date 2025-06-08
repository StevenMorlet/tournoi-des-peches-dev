/*
  Warnings:

  - Added the required column `hashedPassword` to the `EmailVerificationToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `EmailVerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmailVerificationToken" ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
