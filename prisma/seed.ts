import 'dotenv/config';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";
// import { PrismaClient } from "../generated/prisma/client.d.ts";

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
            username: 'Juan Pérez',
            email: 'juan@example.com',
            rol: 'USER',
            password: bcrypt.hashSync("abcd1234", 12)
        }
    });

    const usuario2 = await prisma.usuarios.create({
        data: {
            username: 'María Gómez',
            email: 'maria@example.com',
            rol: 'ADMIN',
            password: bcrypt.hashSync("abcd1234", 12)
        }
    });

    const usuario3 = await prisma.usuarios.create({
        data: {
            username: 'Carlos López',
            email: 'carlos@example.com',
            rol: 'USER',
            password: bcrypt.hashSync("abcd1234", 12)
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
                precio: 24999.99
            }
        }),
        prisma.productos.create({
            data: {
                nombre: 'Mouse Gamer',
                descripcion: 'Mouse Logitech 12000 DPI',
                categoria: 'Periféricos',
                stock: 20,
                precio: 17999.99
            }
        }),
        prisma.productos.create({
            data: {
                nombre: 'Monitor 24"',
                descripcion: 'Monitor Full HD IPS',
                categoria: 'Monitores',
                stock: 10,
                precio: 11999.99
            }
        }),
        prisma.productos.create({
            data: {
                nombre: 'Auriculares',
                descripcion: 'Auriculares inalámbricos',
                categoria: 'Audio',
                stock: 30,
                precio: 44999.99
            }
        }),
        prisma.productos.create({
            data: {
                nombre: 'Webcam HD',
                descripcion: 'Webcam 1080p',
                categoria: 'Video',
                stock: 12,
                precio: 31999.99
            }
        }),
        prisma.productos.create({
            data: {
                nombre: 'Notebook',
                descripcion: 'Notebook Ryzen 7',
                categoria: 'Computadoras',
                stock: 5,
                precio: 849999.99
            }
        }),
        prisma.productos.create({
            data: {
                nombre: 'Disco SSD 1TB',
                descripcion: 'SSD NVMe Gen4',
                categoria: 'Almacenamiento',
                stock: 25,
                precio: 89999.99
            }
        }),
        prisma.productos.create({
            data: {
                nombre: 'Silla Gamer',
                descripcion: 'Silla ergonómica',
                categoria: 'Muebles',
                stock: 8,
                precio: 219999.99
            }
        })
    ]);

    // Órdenes
    const orden1 = await prisma.ordenes.create({
        data: {
            usuarioId: usuario1.id,
            estado: 'CARRITO'
        }
    });

    const orden2 = await prisma.ordenes.create({
        data: {
            usuarioId: usuario2.id,
            estado: 'PAGADA'
        }
    });

    const orden3 = await prisma.ordenes.create({
        data: {
            usuarioId: usuario3.id,
            estado: 'CARRITO'
        }
    });

    const orden4 = await prisma.ordenes.create({
        data: {
            usuarioId: usuario3.id,
            estado: 'PAGO_PENDIENTE'
        }
    });

    const orden5 = await prisma.ordenes.create({
        data: {
            usuarioId: usuario3.id,
            estado: 'PAGADA'
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
            },
            {
                ordenId: orden4.id,
                productId: productos[6].id,
                cantidad: 2,
                precioUnitario: productos[6].precio
            },
            {
                ordenId: orden5.id,
                productId: productos[4].id,
                cantidad: 2,
                precioUnitario: productos[4].precio
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