/*
  Warnings:

  - Made the column `valor` on table `MVA` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MVA" ALTER COLUMN "valor" SET NOT NULL;
