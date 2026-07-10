import { prisma } from '../../src/lib/prisma';
import { seed } from '../../prisma/seed';

export async function resetDatabase() {
    await prisma.$executeRawUnsafe(`
        TRUNCATE TABLE
            "ordenes_productos",
            "ordenes",
            "productos",
            "usuarios"
        RESTART IDENTITY CASCADE;
    `);

    await seed();
}