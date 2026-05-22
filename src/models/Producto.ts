import { Prisma } from '../../generated/prisma/client.ts';
import * as ProductoData from '../interfaces/Producto.ts';
import { prisma } from '../lib/prisma.ts';

class Producto {
  static async create(data : ProductoData.default, callback: (err: Error | null, producto?: ProductoData.default) => void) {
    const { nombre, descripcion, stock, precio } = data;
    
    try {
      const resultProducto : ProductoData.default = await prisma.productos.create({ data: { nombre, descripcion , stock, precio } });
      callback(null, resultProducto);
    } catch (error) {
      console.error(error);
      callback(new Error('Error al crear producto'), undefined);
    }

  }

  static async createMany(data : ProductoData.default[], callback: (err: Error | null, producto?: Prisma.BatchPayload) => void) {
    
    try {
      const resultProducto : Prisma.BatchPayload = await prisma.productos.createMany({ data });
      callback(null, resultProducto);
    } catch (error) {
      console.error(error);
      callback(new Error('Error al crear varios productos'), undefined);
    }

  }

  static async findById(id : number, callback: (err: Error | null, producto?: ProductoData.default) => void) {
    try {
      const producto : ProductoData.default | null = await prisma.productos.findUnique({ where: { id } });
      if (!producto) {
        return callback(new Error('Producto no encontrado'), undefined);
      }
      callback(null, producto);
    } catch (error) {
      console.error(error);
      callback(new Error('Error al obtener el producto'), undefined);
    }
  }

  static async findAll(callback: (err: Error | null, productos?: ProductoData.default[]) => void) {
    try {
      const productos : ProductoData.default[] = await prisma.productos.findMany();
      callback(null, productos);
    } catch (error) {
      console.error(error);
      callback(new Error('Error al obtener los productos'), undefined);
    }
  }

  static async update(id : number, data : Partial<ProductoData.default>, callback: (err: Error | null, producto?: ProductoData.default) => void) {
    try {
      const producto = await prisma.productos.findUnique({ where: { id } });
      if (!producto) {
        return callback(new Error('Producto no encontrado'), undefined);
      }

      const updatedProducto = await prisma.productos.update({
        where: { id },
        data: { ...data }
      });

      callback(null, updatedProducto);
    } catch (error) {
      console.error(error);
      callback(new Error('Error al actualizar el producto'), undefined);
    }
  }

  static async delete(id : number, callback : (err : Error | null) => void) {
    try {
      await prisma.productos.delete({ where: { id } });
      callback(null);
    } catch (error) {
      console.error(error);
      callback(new Error('Error al eliminar el producto'));
    }
  }
}

export default Producto;