/*
  Warnings:

  - You are about to drop the column `nbmSTId` on the `AplicacaoST` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "AplicacaoST" DROP CONSTRAINT "AplicacaoST_nbmSTId_fkey";

-- AlterTable
ALTER TABLE "AplicacaoST" DROP COLUMN "nbmSTId";

-- CreateTable
CREATE TABLE "_AplicacaoSTToNbmST" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AplicacaoSTToNbmST_AB_unique" ON "_AplicacaoSTToNbmST"("A", "B");

-- CreateIndex
CREATE INDEX "_AplicacaoSTToNbmST_B_index" ON "_AplicacaoSTToNbmST"("B");

-- AddForeignKey
ALTER TABLE "_AplicacaoSTToNbmST" ADD CONSTRAINT "_AplicacaoSTToNbmST_A_fkey" FOREIGN KEY ("A") REFERENCES "AplicacaoST"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AplicacaoSTToNbmST" ADD CONSTRAINT "_AplicacaoSTToNbmST_B_fkey" FOREIGN KEY ("B") REFERENCES "nbms_st"("id") ON DELETE CASCADE ON UPDATE CASCADE;
