/*
  Warnings:

  - You are about to drop the `ApplicacaoST` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ApplicacaoSTToNbmST` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ApplicacaoSTToNbmST" DROP CONSTRAINT "_ApplicacaoSTToNbmST_A_fkey";

-- DropForeignKey
ALTER TABLE "_ApplicacaoSTToNbmST" DROP CONSTRAINT "_ApplicacaoSTToNbmST_B_fkey";

-- DropTable
DROP TABLE "ApplicacaoST";

-- DropTable
DROP TABLE "_ApplicacaoSTToNbmST";

-- CreateTable
CREATE TABLE "AplicacaoST" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "AplicacaoST_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AplicacaoSTToNbmST" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AplicacaoST_numero_key" ON "AplicacaoST"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "_AplicacaoSTToNbmST_AB_unique" ON "_AplicacaoSTToNbmST"("A", "B");

-- CreateIndex
CREATE INDEX "_AplicacaoSTToNbmST_B_index" ON "_AplicacaoSTToNbmST"("B");

-- AddForeignKey
ALTER TABLE "_AplicacaoSTToNbmST" ADD CONSTRAINT "_AplicacaoSTToNbmST_A_fkey" FOREIGN KEY ("A") REFERENCES "AplicacaoST"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AplicacaoSTToNbmST" ADD CONSTRAINT "_AplicacaoSTToNbmST_B_fkey" FOREIGN KEY ("B") REFERENCES "nbms_st"("id") ON DELETE CASCADE ON UPDATE CASCADE;
