/*
  Warnings:

  - Made the column `usuarioId` on table `ordenes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fecha` on table `ordenes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nombre` on table `productos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `categoria` on table `productos` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nombre` on table `usuarios` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ordenes" ALTER COLUMN "usuarioId" SET NOT NULL,
ALTER COLUMN "fecha" SET NOT NULL;

-- AlterTable
ALTER TABLE "productos" ALTER COLUMN "nombre" SET NOT NULL,
ALTER COLUMN "categoria" SET NOT NULL;

-- AlterTable
ALTER TABLE "usuarios" ALTER COLUMN "nombre" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;
