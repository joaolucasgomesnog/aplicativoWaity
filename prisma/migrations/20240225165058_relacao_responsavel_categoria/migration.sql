-- CreateTable
CREATE TABLE "Responsavel_categoria" (
    "id" SERIAL NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,

    CONSTRAINT "Responsavel_categoria_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Responsavel_categoria" ADD CONSTRAINT "Responsavel_categoria_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responsavel_categoria" ADD CONSTRAINT "Responsavel_categoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
