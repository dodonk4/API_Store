import 'dotenv/config';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";
import bcrypt from 'bcryptjs';
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando seed...');

    await prisma.ordenes_productos.deleteMany();
    await prisma.ordenes.deleteMany();
    await prisma.productos.deleteMany();
    await prisma.usuarios.deleteMany();

    // Usuarios
    const usuario1 = await prisma.usuarios.create({
        data: {
            nombre: 'Juan Pérez',
            email: 'juan@example.com',
            password: bcrypt.hashSync("abc123", 12)
        }
    });

    const usuario2 = await prisma.usuarios.create({
        data: {
            nombre: 'María Gómez',
            email: 'maria@example.com',
            password: bcrypt.hashSync("abc123", 12)
        }
    });

    const usuario3 = await prisma.usuarios.create({
        data: {
            nombre: 'Carlos López',
            email: 'carlos@example.com',
            password: bcrypt.hashSync("abc123", 12)
        }
    });

    // Productos
    const productos = await Promise.all([
        prisma.productos.create({
            data: {
                nombre: 'Teclado Mecánico',
                descripcion: 'Teclado RGB switches Red',
                categoria: 'Periféricos',
                stock: 15,
                precio: 25000
            }
        }),
        prisma.productos.create({
            data: {
                nombre: 'Mouse Gamer',
                descripcion: 'Mouse Logitech 12000 DPI',
                categoria: 'Periféricos',
                stock: 20,
                precio: 18000
            }
        }),
        prisma.productos.create({
            data: {
                nombre: 'Monitor 24"',
                descripcion: 'Monitor Full HD IPS',
                categoria: 'Monitores',
                stock: 10,
                precio: 120000
            }
        }),
        prisma.productos.create({
            data: {
                nombre: 'Auriculares',
                descripcion: 'Auriculares inalámbricos',
                categoria: 'Audio',
                stock: 30,
                precio: 45000
            }
        }),
        prisma.productos.create({
            data: {
                nombre: 'Webcam HD',
                descripcion: 'Webcam 1080p',
                categoria: 'Video',
                stock: 12,
                precio: 32000
            }
        }),
        prisma.productos.create({
            data: {
                nombre: 'Notebook',
                descripcion: 'Notebook Ryzen 7',
                categoria: 'Computadoras',
                stock: 5,
                precio: 850000
            }
        }),
        prisma.productos.create({
            data: {
                nombre: 'Disco SSD 1TB',
                descripcion: 'SSD NVMe Gen4',
                categoria: 'Almacenamiento',
                stock: 25,
                precio: 90000
            }
        }),
        prisma.productos.create({
            data: {
                nombre: 'Silla Gamer',
                descripcion: 'Silla ergonómica',
                categoria: 'Muebles',
                stock: 8,
                precio: 220000
            }
        })
    ]);

    // Órdenes
    const orden1 = await prisma.ordenes.create({
        data: {
            usuarioId: usuario1.id,
            estado: 'PENDIENTE'
        }
    });

    const orden2 = await prisma.ordenes.create({
        data: {
            usuarioId: usuario2.id,
            estado: 'COMPLETADA'
        }
    });

    const orden3 = await prisma.ordenes.create({
        data: {
            usuarioId: usuario3.id,
            estado: 'ENVIADA'
        }
    });

    // Productos de las órdenes
    await prisma.ordenes_productos.createMany({
        data: [
            {
                ordenId: orden1.id,
                productId: productos[0].id,
                cantidad: 1,
                precioUnitario: productos[0].precio
            },
            {
                ordenId: orden1.id,
                productId: productos[1].id,
                cantidad: 2,
                precioUnitario: productos[1].precio
            },
            {
                ordenId: orden2.id,
                productId: productos[2].id,
                cantidad: 1,
                precioUnitario: productos[2].precio
            },
            {
                ordenId: orden2.id,
                productId: productos[3].id,
                cantidad: 1,
                precioUnitario: productos[3].precio
            },
            {
                ordenId: orden3.id,
                productId: productos[5].id,
                cantidad: 1,
                precioUnitario: productos[5].precio
            },
            {
                ordenId: orden3.id,
                productId: productos[6].id,
                cantidad: 2,
                precioUnitario: productos[6].precio
            }
        ]
    });

    console.log('✅ Seed completado');
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });