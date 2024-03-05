/*
  Warnings:

  - You are about to drop the column `usuarioId` on the `Responsavel_categoria` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Solicitacao` table. All the data in the column will be lost.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `usuarioEmail` to the `Responsavel_categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioEmail` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Responsavel_categoria" DROP CONSTRAINT "Responsavel_categoria_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "Solicitacao" DROP CONSTRAINT "Solicitacao_usuarioId_fkey";

-- DropIndex
DROP INDEX "Usuario_email_key";

-- AlterTable
ALTER TABLE "Responsavel_categoria" DROP COLUMN "usuarioId",
ADD COLUMN     "usuarioEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Solicitacao" DROP COLUMN "usuarioId",
ADD COLUMN     "usuarioEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY ("email");

-- AddForeignKey
ALTER TABLE "Solicitacao" ADD CONSTRAINT "Solicitacao_usuarioEmail_fkey" FOREIGN KEY ("usuarioEmail") REFERENCES "Usuario"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responsavel_categoria" ADD CONSTRAINT "Responsavel_categoria_usuarioEmail_fkey" FOREIGN KEY ("usuarioEmail") REFERENCES "Usuario"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
