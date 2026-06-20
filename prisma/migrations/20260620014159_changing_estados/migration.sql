/*
  Warnings:

  - The values [PENDING,ACTIVE,COMPLETED] on the enum `Estados` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Estados_new" AS ENUM ('CARRITO', 'PAGO_PENDIENTE', 'PAGADA', 'CANCELADA');
ALTER TABLE "public"."ordenes" ALTER COLUMN "estado" DROP DEFAULT;
ALTER TABLE "ordenes" ALTER COLUMN "estado" TYPE "Estados_new" USING ("estado"::text::"Estados_new");
ALTER TYPE "Estados" RENAME TO "Estados_old";
ALTER TYPE "Estados_new" RENAME TO "Estados";
DROP TYPE "public"."Estados_old";
ALTER TABLE "ordenes" ALTER COLUMN "estado" SET DEFAULT 'CARRITO';
COMMIT;

-- AlterTable
ALTER TABLE "ordenes" ALTER COLUMN "estado" SET DEFAULT 'CARRITO';
