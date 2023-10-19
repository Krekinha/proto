/*
  Warnings:

  - You are about to drop the column `cte` on the `nbms_st` table. All the data in the column will be lost.
  - You are about to drop the column `mva` on the `nbms_st` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "nbms_st" DROP CONSTRAINT "nbms_st_aplicacaoId_fkey";

-- AlterTable
ALTER TABLE "nbms_st" DROP COLUMN "cte",
DROP COLUMN "mva";

-- CreateTable
CREATE TABLE "MVA" (
    "id" TEXT NOT NULL,
    "valor" TEXT,
    "descricao" TEXT,
    "nbmSTId" TEXT,

    CONSTRAINT "MVA_pkey" PRIMARY KEY ("id")
);

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
ALTER TABLE "MVA" ADD CONSTRAINT "MVA_nbmSTId_fkey" FOREIGN KEY ("nbmSTId") REFERENCES "nbms_st"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AplicacaoSTToNbmST" ADD CONSTRAINT "_AplicacaoSTToNbmST_A_fkey" FOREIGN KEY ("A") REFERENCES "AplicacaoST"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AplicacaoSTToNbmST" ADD CONSTRAINT "_AplicacaoSTToNbmST_B_fkey" FOREIGN KEY ("B") REFERENCES "nbms_st"("id") ON DELETE CASCADE ON UPDATE CASCADE;
