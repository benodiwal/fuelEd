/*
  Warnings:

  - You are about to drop the column `sub` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_sub_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "sub";
