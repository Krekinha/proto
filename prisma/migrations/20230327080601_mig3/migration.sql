/*
  Warnings:

  - You are about to drop the column `senha` on the `user` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'DEV');

-- AlterTable
ALTER TABLE "user" DROP COLUMN "senha",
ADD COLUMN     "VerifyEm" TIMESTAMP(3),
ADD COLUMN     "criadoEm" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "pix" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "telefone" TEXT;

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demandas" (
    "id" TEXT NOT NULL,
    "codigo" INTEGER,
    "servico" TEXT NOT NULL,
    "prazo" TIMESTAMP(3),
    "linkTrello" TEXT,
    "ciclo" TEXT,
    "pasta" TEXT,
    "concluido" BOOLEAN NOT NULL DEFAULT false,
    "dataConclusao" TIMESTAMP(3),
    "clienteId" TEXT NOT NULL,

    CONSTRAINT "demandas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monetizacao_demandas" (
    "id" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "despesas" DECIMAL(65,30),
    "valorVisivel" BOOLEAN NOT NULL DEFAULT false,
    "demandaId" TEXT NOT NULL,

    CONSTRAINT "monetizacao_demandas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamento_demandas" (
    "id" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "userId" TEXT NOT NULL,
    "monetizacaoDemandaId" TEXT NOT NULL,

    CONSTRAINT "pagamento_demandas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evolucoes" (
    "id" TEXT NOT NULL,
    "demandaId" TEXT NOT NULL,

    CONSTRAINT "evolucoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tarefas" (
    "id" TEXT NOT NULL,
    "dataRegistro" TIMESTAMP(3),
    "descricao" TEXT NOT NULL,
    "concluido" BOOLEAN NOT NULL DEFAULT false,
    "dataConclusao" TIMESTAMP(3),
    "evolucaoId" TEXT NOT NULL,
    "userCriouId" TEXT NOT NULL,
    "userAtribuidoId" TEXT,
    "userConcluiuId" TEXT,

    CONSTRAINT "tarefas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clientes" (
    "id" TEXT NOT NULL,
    "tipoCliente" TEXT NOT NULL,
    "cnpjCpf" TEXT NOT NULL,
    "razaoNome" TEXT NOT NULL,
    "naturezaJuridica" TEXT,
    "estadoCivilPf" TEXT,
    "rgPf" TEXT,
    "dnPf" TIMESTAMP(3),
    "email" TEXT,
    "nire" TEXT,
    "optante" BOOLEAN,
    "certificado" BOOLEAN,
    "validadeCertificado" TIMESTAMP(3),
    "logradouroEmpresa" TEXT,
    "numeroLogradouroEmpresa" TEXT,
    "bairroEmpresa" TEXT,
    "cepEmpresa" TEXT,
    "cidadeEmpresa" TEXT,
    "ufEmpresa" TEXT,
    "telefoneEmpresa" TEXT,
    "cpfResponsavel" TEXT,
    "nomeResponsavel" TEXT,
    "estadoCivilResponsavel" TEXT,
    "rgResponsavel" TEXT,
    "dnResponsavel" TIMESTAMP(3),
    "logradouroResponsavel" TEXT,
    "numeroLogradouroResponsavel" TEXT,
    "bairroResponsavel" TEXT,
    "cepResponsavel" TEXT,
    "cidadeResponsavel" TEXT,
    "ufResponsavel" TEXT,
    "telefoneResponsavel" TEXT,
    "codigoSimples" TEXT,
    "codigoEcac" TEXT,
    "criadoEm" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3),
    "userCriouId" TEXT,
    "userAtualizouId" TEXT,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios_autorizados" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "usuarios_autorizados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DemandaToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "monetizacao_demandas_demandaId_key" ON "monetizacao_demandas"("demandaId");

-- CreateIndex
CREATE UNIQUE INDEX "evolucoes_demandaId_key" ON "evolucoes"("demandaId");

-- CreateIndex
CREATE UNIQUE INDEX "clientes_cnpjCpf_key" ON "clientes"("cnpjCpf");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_autorizados_email_key" ON "usuarios_autorizados"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_DemandaToUser_AB_unique" ON "_DemandaToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DemandaToUser_B_index" ON "_DemandaToUser"("B");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demandas" ADD CONSTRAINT "demandas_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monetizacao_demandas" ADD CONSTRAINT "monetizacao_demandas_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "demandas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamento_demandas" ADD CONSTRAINT "pagamento_demandas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamento_demandas" ADD CONSTRAINT "pagamento_demandas_monetizacaoDemandaId_fkey" FOREIGN KEY ("monetizacaoDemandaId") REFERENCES "monetizacao_demandas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "evolucoes" ADD CONSTRAINT "evolucoes_demandaId_fkey" FOREIGN KEY ("demandaId") REFERENCES "demandas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_userCriouId_fkey" FOREIGN KEY ("userCriouId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_userAtribuidoId_fkey" FOREIGN KEY ("userAtribuidoId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_userConcluiuId_fkey" FOREIGN KEY ("userConcluiuId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tarefas" ADD CONSTRAINT "tarefas_evolucaoId_fkey" FOREIGN KEY ("evolucaoId") REFERENCES "evolucoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_userCriouId_fkey" FOREIGN KEY ("userCriouId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clientes" ADD CONSTRAINT "clientes_userAtualizouId_fkey" FOREIGN KEY ("userAtualizouId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemandaToUser" ADD CONSTRAINT "_DemandaToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "demandas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DemandaToUser" ADD CONSTRAINT "_DemandaToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
