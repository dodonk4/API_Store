import * as UsuarioData from "../interfaces/Usuario.ts";
import { prisma } from "../lib/prisma.ts";

class Usuario {
  static async create(data: UsuarioData.default, callback: (err: Error | null, usuario?: UsuarioData.default) => void) {
    const { nombre, email, password } = data;
    try {
      const resultUsuario: UsuarioData.default = await prisma.usuarios.create({ data: { nombre, email, password } });
      callback(null, resultUsuario);
    } catch (error) {
      console.error(error);
    }
  }

  static async findById(id: number, callback: (err: Error | null, usuario?: UsuarioData.default) => void) {
    try {
      const resultUsuario: UsuarioData.default | null = await prisma.usuarios.findUnique({ where: { id } });
      if (!resultUsuario) {
        return callback(new Error('Usuario no encontrado'), undefined);
      }
      callback(null, resultUsuario);
    } catch (error) {
      console.error(error);
      callback(new Error('Error al buscar usuario'), undefined);
    }
  }

  static async findAll(callback: (err: Error | null, ordenes?: UsuarioData.default[]) => void) {
    try {
      const resultAllUsuarios: UsuarioData.default[] = await prisma.usuarios.findMany();
      callback(null, resultAllUsuarios);
    } catch (error) {
      console.error(error);
    }

  }
  static async update(id: number, data: Partial<UsuarioData.default>, callback: (err: Error | null, usuario?: Partial<UsuarioData.default>) => void) {
    try {
      const updateUser = await prisma.usuarios.update({
        where: { id },
        data: { ...data },
      });

      callback(null, updateUser);
    } catch (error) {
      console.error(error);
      callback(new Error('Error al actualizar el usuario'), undefined);
    }

  }

  static async delete(id: number, callback: (err: Error | null) => void) {
    try {
      const deleteUser = await prisma.usuarios.delete({
        where: { id }
      });
      callback(null);
    } catch (error) {
      console.error(error);
      callback(new Error('Error al eliminar el usuario'));
    }
  }
}

export default Usuario;