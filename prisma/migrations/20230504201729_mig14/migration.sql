-- DropForeignKey
ALTER TABLE "nbms_st" DROP CONSTRAINT "nbms_st_capituloId_fkey";

-- DropIndex
DROP INDEX "CapituloST_numero_key";

-- AddForeignKey
ALTER TABLE "nbms_st" ADD CONSTRAINT "nbms_st_capituloId_fkey" FOREIGN KEY ("capituloId") REFERENCES "CapituloST"("id") ON DELETE SET NULL ON UPDATE CASCADE;
