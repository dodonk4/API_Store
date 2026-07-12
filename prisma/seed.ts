import 'dotenv/config';
import { prisma } from '../src/lib/prisma.ts';

const PASSWORD_HASH =
    '$2b$12$MIInMAEMLNPGpIs/fRUMqOUG0CtVsgN.j1rm1vRACOfHEhCZe86Ci'; // abcd1234

export async function seed() {
    await prisma.$executeRawUnsafe(`
        TRUNCATE TABLE
            "orders_products",
            "orders",
            "products",
            "users"
        RESTART IDENTITY CASCADE;
    `);

    await prisma.users.createMany({
        data: [
            {
                username: 'Juan Pérez',
                email: 'juan@example.com',
                rol: 'USER',
                password: PASSWORD_HASH,
            },
            {
                username: 'María Gómez',
                email: 'maria@example.com',
                rol: 'ADMIN',
                password: PASSWORD_HASH,
            },
            {
                username: 'Carlos López',
                email: 'carlos@example.com',
                rol: 'USER',
                password: PASSWORD_HASH,
            },
        ],
    });

    await prisma.products.createMany({
        data: [
            {
                name: 'Teclado Mecánico',
                description: 'Teclado RGB switches Red',
                category: 'Periféricos',
                stock: 15,
                price: 24999.99,
            },
            {
                name: 'Mouse Gamer',
                description: 'Mouse Logitech 12000 DPI',
                category: 'Periféricos',
                stock: 20,
                price: 17999.99,
            },
            {
                name: 'Monitor 24"',
                description: 'Monitor Full HD IPS',
                category: 'Monitores',
                stock: 10,
                price: 11999.99,
            },
            {
                name: 'Auriculares',
                description: 'Auriculares inalámbricos',
                category: 'Audio',
                stock: 30,
                price: 44999.99,
            },
            {
                name: 'Webcam HD',
                description: 'Webcam 1080p',
                category: 'Video',
                stock: 12,
                price: 31999.99,
            },
            {
                name: 'Notebook',
                description: 'Notebook Ryzen 7',
                category: 'Computadoras',
                stock: 5,
                price: 849999.99,
            },
            {
                name: 'Disco SSD 1TB',
                description: 'SSD NVMe Gen4',
                category: 'Almacenamiento',
                stock: 25,
                price: 89999.99,
            },
            {
                name: 'Silla Gamer',
                description: 'Silla ergonómica',
                category: 'Muebles',
                stock: 8,
                price: 219999.99,
            },
        ],
    });

    await prisma.orders.createMany({
        data: [
            {
                userId: 1,
                state: 'CART',
            },
            {
                userId: 2,
                state: 'PAID',
            },
            {
                userId: 3,
                state: 'CART',
            },
            {
                userId: 3,
                state: 'PENDING_PAYMENT',
            },
            {
                userId: 3,
                state: 'PAID',
            },
        ],
    });

    await prisma.orders_products.createMany({
        data: [
            {
                orderId: 1,
                productId: 1,
                quantity: 1,
                unitPrice: 24999.99,
            },
            {
                orderId: 1,
                productId: 2,
                quantity: 2,
                unitPrice: 17999.99,
            },
            {
                orderId: 2,
                productId: 3,
                quantity: 1,
                unitPrice: 11999.99,
            },
            {
                orderId: 2,
                productId: 4,
                quantity: 1,
                unitPrice: 44999.99,
            },
            {
                orderId: 3,
                productId: 6,
                quantity: 1,
                unitPrice: 849999.99,
            },
            {
                orderId: 3,
                productId: 7,
                quantity: 2,
                unitPrice: 89999.99,
            },
            {
                orderId: 4,
                productId: 7,
                quantity: 2,
                unitPrice: 89999.99,
            },
            {
                orderId: 5,
                productId: 5,
                quantity: 2,
                unitPrice: 31999.99,
            },
        ],
    });
}

if (import.meta.main) {
    seed()
        .catch((error) => {
            console.error(error);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}