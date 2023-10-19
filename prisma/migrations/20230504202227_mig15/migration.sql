/*
  Warnings:

  - A unique constraint covering the columns `[numero]` on the table `CapituloST` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CapituloST_numero_key" ON "CapituloST"("numero");
