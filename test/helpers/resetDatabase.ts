import { prisma } from '../../src/lib/prisma';
import { seed } from '../../prisma/seed';

export async function resetDatabase() {
    await prisma.$executeRawUnsafe(`
        TRUNCATE TABLE
            "orders_products",
            "orders",
            "products",
            "users"
        RESTART IDENTITY CASCADE;
    `);

    await seed();
}