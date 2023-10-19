/*
  Warnings:

  - You are about to drop the `AplicacaoST` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AplicacaoSTToNbmST` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AplicacaoSTToNbmST" DROP CONSTRAINT "_AplicacaoSTToNbmST_A_fkey";

-- DropForeignKey
ALTER TABLE "_AplicacaoSTToNbmST" DROP CONSTRAINT "_AplicacaoSTToNbmST_B_fkey";

-- DropTable
DROP TABLE "AplicacaoST";

-- DropTable
DROP TABLE "_AplicacaoSTToNbmST";

-- CreateTable
CREATE TABLE "ApplicacaoST" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "descricao" TEXT,

    CONSTRAINT "ApplicacaoST_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ApplicacaoSTToNbmST" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ApplicacaoST_numero_key" ON "ApplicacaoST"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "_ApplicacaoSTToNbmST_AB_unique" ON "_ApplicacaoSTToNbmST"("A", "B");

-- CreateIndex
CREATE INDEX "_ApplicacaoSTToNbmST_B_index" ON "_ApplicacaoSTToNbmST"("B");

-- AddForeignKey
ALTER TABLE "_ApplicacaoSTToNbmST" ADD CONSTRAINT "_ApplicacaoSTToNbmST_A_fkey" FOREIGN KEY ("A") REFERENCES "ApplicacaoST"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ApplicacaoSTToNbmST" ADD CONSTRAINT "_ApplicacaoSTToNbmST_B_fkey" FOREIGN KEY ("B") REFERENCES "nbms_st"("id") ON DELETE CASCADE ON UPDATE CASCADE;
