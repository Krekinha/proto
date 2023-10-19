-- AlterTable
ALTER TABLE "nbms_st" ADD COLUMN     "aplicacaoId" TEXT,
ADD COLUMN     "capituloId" TEXT;

-- CreateTable
CREATE TABLE "CapituloST" (
    "id" TEXT NOT NULL,
    "numero" TEXT,
    "descricao" TEXT,

    CONSTRAINT "CapituloST_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AplicacaoST" (
    "id" TEXT NOT NULL,
    "numero" TEXT,
    "descricao" TEXT,

    CONSTRAINT "AplicacaoST_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "nbms_st" ADD CONSTRAINT "nbms_st_capituloId_fkey" FOREIGN KEY ("capituloId") REFERENCES "CapituloST"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nbms_st" ADD CONSTRAINT "nbms_st_aplicacaoId_fkey" FOREIGN KEY ("aplicacaoId") REFERENCES "AplicacaoST"("id") ON DELETE SET NULL ON UPDATE CASCADE;
