/*
  Warnings:

  - The `estado` column on the `ordenes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Estados" AS ENUM ('PENDING', 'ACTIVE', 'COMPLETED');

-- AlterTable
ALTER TABLE "ordenes" DROP COLUMN "estado",
ADD COLUMN     "estado" "Estados" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "ordenes_productos" ALTER COLUMN "precioUnitario" SET DEFAULT 0,
ALTER COLUMN "precioUnitario" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "productos" ALTER COLUMN "precio" SET DEFAULT 0,
ALTER COLUMN "precio" SET DATA TYPE DECIMAL(65,30);
