/*
  Warnings:

  - You are about to drop the column `oauth_token` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `oauth_token_secret` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PixTipo" AS ENUM ('CPF', 'CNPJ', 'CELULAR', 'EMAIL', 'CHAVE');

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "_DemandaToUser" DROP CONSTRAINT "_DemandaToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "clientes" DROP CONSTRAINT "clientes_userAtualizouId_fkey";

-- DropForeignKey
ALTER TABLE "clientes" DROP CONSTRAINT "clientes_userCriouId_fkey";

-- DropForeignKey
ALTER TABLE "pagamento_demandas" DROP CONSTRAINT "pagamento_demandas_userId_fkey";

-- DropForeignKey
ALTER TABLE "tarefas" DROP CONSTRAINT "tarefas_userAtribuidoId_fkey";

-- DropForeignKey
ALTER TABLE "tarefas" DROP CONSTRAINT "tarefas_userConcluiuId_fkey";

-- DropForeignKey
ALTER TABLE "tarefas" DROP CONSTRAINT "tarefas_userCriouId_fkey";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "oauth_token",
DROP COLUMN "oauth_token_secret";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "telefone" TEXT,
    "pix" TEXT,
    "pixTipo" "PixTipo",
    "criadoEm" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "senha" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamento_demandas" ADD CONSTRAINT "pagamento_demandas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_userCriouId_fkey" FOREIGN KEY ("userCriouId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_userAtribuidoId_fkey" FOREIGN KEY ("userAtribuidoId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_userConcluiuId_fkey" FOREIGN KEY ("userConcluiuId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_userCriouId_fkey" FOREIGN KEY ("userCriouId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_userAtualizouId_fkey" FOREIGN KEY ("userAtualizouId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemandaToUser" ADD CONSTRAINT "_DemandaToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
