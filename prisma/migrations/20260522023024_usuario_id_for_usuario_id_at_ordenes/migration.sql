/*
  Warnings:

  - You are about to drop the column `usuario_id` on the `ordenes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ordenes" DROP CONSTRAINT "ordenes_usuario_id_fkey";

-- AlterTable
ALTER TABLE "ordenes" DROP COLUMN "usuario_id",
ADD COLUMN     "usuarioId" INTEGER;

-- AddForeignKey
ALTER TABLE "ordenes" ADD CONSTRAINT "ordenes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
