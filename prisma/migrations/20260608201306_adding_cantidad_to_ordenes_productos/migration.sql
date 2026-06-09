/*
  Warnings:

  - Made the column `precioUnitario` on table `ordenes_productos` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ordenes_productos" ADD COLUMN     "cantidad" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "precioUnitario" SET NOT NULL;
