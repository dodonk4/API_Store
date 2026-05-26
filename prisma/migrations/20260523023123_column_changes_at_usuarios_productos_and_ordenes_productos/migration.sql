/*
  Warnings:

  - You are about to drop the column `estado` on the `ordenes_productos` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `ordenes_productos` table. All the data in the column will be lost.
  - Added the required column `password` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ordenes" ADD COLUMN     "estado" VARCHAR(20),
ADD COLUMN     "fecha" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ordenes_productos" DROP COLUMN "estado",
DROP COLUMN "fecha";

-- AlterTable
ALTER TABLE "productos" ADD COLUMN     "categoria" VARCHAR(200);

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "password" VARCHAR(30) NOT NULL;
