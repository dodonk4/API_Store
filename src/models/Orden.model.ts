import * as OrdenData from "../interfaces/Orden.interface.ts";
import { prisma } from "../lib/prisma.ts";

class Orden {
  static async create(data: OrdenData.default, callback: (err: Error | null, orden?: OrdenData.default) => void) {
    const { usuarioId, estado, fecha } = data;
    try {
      const resultOrden: OrdenData.default = await prisma.ordenes.create({ data: { usuarioId, estado, fecha } });
      callback(null, resultOrden);
    } catch (error) {
      console.error(error);
      callback(new Error('Error al crear orden'), undefined);
    }

  }

  static async findAll(callback: (err: Error | null, ordenes?: OrdenData.default[]) => void) {
    try {
      const result = await prisma.ordenes.findMany();
      callback(null, result);
    } catch (error) {
      console.error(error);
      callback(new Error('Error al obtener ordenes'), undefined);
    }

  }

  static async findById(id: number, callback: (err: Error | null, orden?: OrdenData.default) => void) {
    try {
      const result: OrdenData.default | null = await prisma.ordenes.findUnique({ where: { id } });
      if (!result) {
        return callback(new Error('Orden no encontrada'), undefined);
      }
      callback(null, result);
    } catch (error) {
      console.error(error);
      callback(new Error('Error al buscar orden'), undefined);
    }

  }

  //Lo comento porque la orden no es la que debe actualizarse, sino el orden_producto

  // static async update(id: number, data: Partial<OrdenData.default>, callback: (err: Error | null, orden?: Partial<OrdenData.default>) => void) {
  //   try{
  //     const updateOrden = await prisma.ordenes.update({
  //       where: { id },
  //       data: { ...data },
  //     });
  //     callback(null, updateOrden);
  //   } catch (error) {
  //     console.error(error);
  //     callback(new Error('Error al actualizar orden'), undefined);
  //   }
  // }

  static async delete(id: number, callback: (err: Error | null) => void){
    try {
      await prisma.ordenes.delete({
        where: { id }
      })
      callback(null);
    } catch (error) {
      console.error(error);
      callback(new Error('Error al borrar la orden'));
    }
  }

}

export default Orden;