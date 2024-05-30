/*
  Warnings:

  - You are about to drop the column `signedByHost` on the `Contract` table. All the data in the column will be lost.
  - You are about to drop the column `signedByVendor` on the `Contract` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ContractStatus" AS ENUM ('SIGNED_BY_HOST', 'SIGNED_BY_BOTH');

-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "signedByHost",
DROP COLUMN "signedByVendor",
ADD COLUMN     "status" "ContractStatus" NOT NULL DEFAULT 'SIGNED_BY_HOST';
