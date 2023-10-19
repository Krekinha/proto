/*
  Warnings:

  - You are about to drop the column `aplicacaoId` on the `nbms_st` table. All the data in the column will be lost.
  - You are about to drop the `_AplicacaoSTToNbmST` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[numero]` on the table `AplicacaoST` will be added. If there are existing duplicate values, this will fail.
  - Made the column `numero` on table `AplicacaoST` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_AplicacaoSTToNbmST" DROP CONSTRAINT "_AplicacaoSTToNbmST_A_fkey";

-- DropForeignKey
ALTER TABLE "_AplicacaoSTToNbmST" DROP CONSTRAINT "_AplicacaoSTToNbmST_B_fkey";

-- AlterTable
ALTER TABLE "AplicacaoST" ADD COLUMN     "nbmSTId" TEXT,
ALTER COLUMN "numero" SET NOT NULL;

-- AlterTable
ALTER TABLE "nbms_st" DROP COLUMN "aplicacaoId";

-- DropTable
DROP TABLE "_AplicacaoSTToNbmST";

-- CreateIndex
CREATE UNIQUE INDEX "AplicacaoST_numero_key" ON "AplicacaoST"("numero");

-- AddForeignKey
ALTER TABLE "AplicacaoST" ADD CONSTRAINT "AplicacaoST_nbmSTId_fkey" FOREIGN KEY ("nbmSTId") REFERENCES "nbms_st"("id") ON DELETE SET NULL ON UPDATE CASCADE;
