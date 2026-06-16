-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "rol" "Roles" NOT NULL DEFAULT 'USER';
