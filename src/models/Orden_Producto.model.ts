import { Prisma } from "../../generated/prisma/client.ts";
import * as Orden_ProductoData from "../interfaces/Orden_Producto.interface.ts";
import { prisma } from "../lib/prisma";

class Orden_Producto {
    static async create(data: Orden_ProductoData.default, callback: (err: Error | null, ordenProducto?: Orden_ProductoData.default) => void) {
        const { ordenId, productId, precioUnitario } = data;
        const fecha = new Date();
        try {
            const ordenProducto: Orden_ProductoData.default = await prisma.ordenes_productos.create({ data: { ordenId, productId, precioUnitario } })
            callback(null, ordenProducto);
        } catch (error) {
            console.error(error);
            callback(new Error('Error al crear orden_producto'), undefined);
        }
    }

    static async createMany(data: Orden_ProductoData.default[], callback: (err: Error | null, ordenesProductos?: Prisma.BatchPayload) => void) {
        try {
            data.forEach(e => {
                if (!e.ordenId || !e.productId) {
                    return callback(new Error('Faltan campos obligfatorios: orden_id o product_id incompletos'), undefined);
                }
            });
            const ordenProducto: Prisma.BatchPayload = await prisma.ordenes_productos.createMany({ data });
            callback(null, ordenProducto);
        } catch (error) {
            console.error(error);
            callback(new Error('Error al crear varios orden_producto'), undefined);
        }
    }

    static async findById(id: number, callback: (err: Error | null, ordenProducto?: Orden_ProductoData.default) => void) {
        try {
            const ordenProducto: Orden_ProductoData.default | null = await prisma.ordenes_productos.findUnique({ where: { id } });
            if (!ordenProducto) {
                return callback(new Error('Orden_Producto no encontrado'), undefined);
            }
            callback(null, ordenProducto);
        } catch (error) {
            console.error(error);
            callback(new Error('Error al buscar orden_producto'), undefined);
        }
    }

    static async update(id: number, data: Partial<Orden_ProductoData.default>, callback: (err: Error | null, ordenProducto?: Orden_ProductoData.default) => void) {
        try {
            const ordenProducto: Orden_ProductoData.default = await prisma.ordenes_productos.update({ where: { id }, data });
            callback(null, ordenProducto);
        } catch (error) {
            console.error(error);
            callback(new Error('Error al actualizar orden_producto'), undefined);
        }
    }

    static async delete(id: number, callback: (err: Error | null) => void) {
        try {
            await prisma.ordenes_productos.delete({ where: { id } });
            callback(null);
        } catch (error) {
            console.log(error);
            callback(new Error('Error al eliminar orden_producto'));
        }

    }



}

export default Orden_Producto;