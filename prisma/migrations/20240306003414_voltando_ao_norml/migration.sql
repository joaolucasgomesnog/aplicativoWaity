/*
  Warnings:

  - You are about to drop the column `usuarioEmail` on the `Responsavel_categoria` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioEmail` on the `Solicitacao` table. All the data in the column will be lost.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usuarioId` to the `Responsavel_categoria` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Solicitacao` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Responsavel_categoria" DROP CONSTRAINT "Responsavel_categoria_usuarioEmail_fkey";

-- DropForeignKey
ALTER TABLE "Solicitacao" DROP CONSTRAINT "Solicitacao_usuarioEmail_fkey";

-- AlterTable
ALTER TABLE "Responsavel_categoria" DROP COLUMN "usuarioEmail",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Solicitacao" DROP COLUMN "usuarioEmail",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Solicitacao" ADD CONSTRAINT "Solicitacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responsavel_categoria" ADD CONSTRAINT "Responsavel_categoria_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
