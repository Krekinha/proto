-- CreateTable
CREATE TABLE "nbms_st" (
    "id" TEXT NOT NULL,
    "nbm" TEXT,
    "cest" TEXT,
    "mva" TEXT,
    "cte" TEXT,
    "descricao" TEXT,
    "mensagem" TEXT,

    CONSTRAINT "nbms_st_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monofasicos" (
    "id" TEXT NOT NULL,
    "ncm" TEXT,
    "grupo" TEXT,
    "codGrupo" TEXT,
    "subGrupo" TEXT,
    "codSubgrupo" TEXT,
    "excecao" TEXT,

    CONSTRAINT "monofasicos_pkey" PRIMARY KEY ("id")
);
