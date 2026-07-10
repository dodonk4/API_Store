import 'dotenv/config';
import { prisma } from '../src/lib/prisma.ts';

const PASSWORD_HASH =
    '$2b$12$MIInMAEMLNPGpIs/fRUMqOUG0CtVsgN.j1rm1vRACOfHEhCZe86Ci'; // abcd1234

export async function seed() {
    await prisma.$executeRawUnsafe(`
        TRUNCATE TABLE
            "ordenes_productos",
            "ordenes",
            "productos",
            "usuarios"
        RESTART IDENTITY CASCADE;
    `);

    await prisma.usuarios.createMany({
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

    await prisma.productos.createMany({
        data: [
            {
                nombre: 'Teclado Mecánico',
                descripcion: 'Teclado RGB switches Red',
                categoria: 'Periféricos',
                stock: 15,
                precio: 24999.99,
            },
            {
                nombre: 'Mouse Gamer',
                descripcion: 'Mouse Logitech 12000 DPI',
                categoria: 'Periféricos',
                stock: 20,
                precio: 17999.99,
            },
            {
                nombre: 'Monitor 24"',
                descripcion: 'Monitor Full HD IPS',
                categoria: 'Monitores',
                stock: 10,
                precio: 11999.99,
            },
            {
                nombre: 'Auriculares',
                descripcion: 'Auriculares inalámbricos',
                categoria: 'Audio',
                stock: 30,
                precio: 44999.99,
            },
            {
                nombre: 'Webcam HD',
                descripcion: 'Webcam 1080p',
                categoria: 'Video',
                stock: 12,
                precio: 31999.99,
            },
            {
                nombre: 'Notebook',
                descripcion: 'Notebook Ryzen 7',
                categoria: 'Computadoras',
                stock: 5,
                precio: 849999.99,
            },
            {
                nombre: 'Disco SSD 1TB',
                descripcion: 'SSD NVMe Gen4',
                categoria: 'Almacenamiento',
                stock: 25,
                precio: 89999.99,
            },
            {
                nombre: 'Silla Gamer',
                descripcion: 'Silla ergonómica',
                categoria: 'Muebles',
                stock: 8,
                precio: 219999.99,
            },
        ],
    });

    await prisma.ordenes.createMany({
        data: [
            {
                usuarioId: 1,
                estado: 'CARRITO',
            },
            {
                usuarioId: 2,
                estado: 'PAGADA',
            },
            {
                usuarioId: 3,
                estado: 'CARRITO',
            },
            {
                usuarioId: 3,
                estado: 'PAGO_PENDIENTE',
            },
            {
                usuarioId: 3,
                estado: 'PAGADA',
            },
        ],
    });

    await prisma.ordenes_productos.createMany({
        data: [
            {
                ordenId: 1,
                productId: 1,
                cantidad: 1,
                precioUnitario: 24999.99,
            },
            {
                ordenId: 1,
                productId: 2,
                cantidad: 2,
                precioUnitario: 17999.99,
            },
            {
                ordenId: 2,
                productId: 3,
                cantidad: 1,
                precioUnitario: 11999.99,
            },
            {
                ordenId: 2,
                productId: 4,
                cantidad: 1,
                precioUnitario: 44999.99,
            },
            {
                ordenId: 3,
                productId: 6,
                cantidad: 1,
                precioUnitario: 849999.99,
            },
            {
                ordenId: 3,
                productId: 7,
                cantidad: 2,
                precioUnitario: 89999.99,
            },
            {
                ordenId: 4,
                productId: 7,
                cantidad: 2,
                precioUnitario: 89999.99,
            },
            {
                ordenId: 5,
                productId: 5,
                cantidad: 2,
                precioUnitario: 31999.99,
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