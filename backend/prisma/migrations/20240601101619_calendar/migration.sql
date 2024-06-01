/*
  Warnings:

  - The `contractData` column on the `Contract` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "contractData",
ADD COLUMN     "contractData" JSONB;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasGivenCalendarAccess" BOOLEAN NOT NULL DEFAULT false;
