/*
  Warnings:

  - A unique constraint covering the columns `[numero]` on the table `CapituloST` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "nbms_st" DROP CONSTRAINT "nbms_st_capituloId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "CapituloST_numero_key" ON "CapituloST"("numero");

-- AddForeignKey
ALTER TABLE "nbms_st" ADD CONSTRAINT "nbms_st_capituloId_fkey" FOREIGN KEY ("capituloId") REFERENCES "CapituloST"("numero") ON DELETE SET NULL ON UPDATE CASCADE;
