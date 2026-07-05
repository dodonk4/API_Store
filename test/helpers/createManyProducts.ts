import { prisma } from "../../src/lib/prisma";


export async function createManyProducts(): Promise<any> {
    await prisma.productos.createMany({
        data: [
            {
                nombre: 'Teclado Mecánico',
                descripcion: 'Teclado RGB switches Red',
                categoria: 'Periféricos',
                stock: 15,
                precio: 24999.99
            },
            {
                nombre: 'Mouse Gamer',
                descripcion: 'Mouse Logitech 12000 DPI',
                categoria: 'Periféricos',
                stock: 20,
                precio: 17999.99
            },
            {
                nombre: 'Monitor 24"',
                descripcion: 'Monitor Full HD IPS',
                categoria: 'Monitores',
                stock: 10,
                precio: 11999.99
            },
            {
                nombre: 'Auriculares',
                descripcion: 'Auriculares inalámbricos',
                categoria: 'Audio',
                stock: 30,
                precio: 44999.99
            },
            {
                nombre: 'Webcam HD',
                descripcion: 'Webcam 1080p',
                categoria: 'Video',
                stock: 12,
                precio: 31999.99
            },
            {
                nombre: 'Notebook',
                descripcion: 'Notebook Ryzen 7',
                categoria: 'Computadoras',
                stock: 5,
                precio: 849999.99
            },
            {
                nombre: 'Disco SSD 1TB',
                descripcion: 'SSD NVMe Gen4',
                categoria: 'Almacenamiento',
                stock: 25,
                precio: 89999.99
            },
            {
                nombre: 'Silla Gamer',
                descripcion: 'Silla ergonómica',
                categoria: 'Muebles',
                stock: 8,
                precio: 219999.99
            }
        ]
    })
};