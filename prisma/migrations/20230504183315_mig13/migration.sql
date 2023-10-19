/*
  Warnings:

  - Made the column `numero` on table `CapituloST` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CapituloST" ALTER COLUMN "numero" SET NOT NULL;
