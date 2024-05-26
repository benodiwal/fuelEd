/*
  Warnings:

  - Added the required column `title` to the `EventFloorPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventFloorPlan" ADD COLUMN     "title" TEXT NOT NULL;
