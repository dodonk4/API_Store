import type { CreateUsuarioData, UsuarioData } from '../interfaces/Usuario.interface.ts';
import { prisma } from '../lib/prisma.ts';

export async function createUsuario(data: CreateUsuarioData): Promise<UsuarioData> {
  try {
    return await prisma.usuarios.create({ data });
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear usuario');
  }
}

export async function findUsuarioById(id: number): Promise<UsuarioData> {
  try {
    const usuario = await prisma.usuarios.findUnique({ where: { id } });
    if (!usuario) throw new Error('Usuario no encontrado');
    return usuario;
  } catch (error) {
    console.error(error);
    throw new Error('Error al buscar usuario');
  }
}

export async function findAllUsuarios(): Promise<UsuarioData[]> {
  try {
    return await prisma.usuarios.findMany();
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener usuarios');
  }
}

export async function updateUsuario(id: number, data: Partial<UsuarioData>): Promise<UsuarioData> {
  try {
    return await prisma.usuarios.update({ where: { id }, data });
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar el usuario');
  }
}

export async function deleteUsuarioService(id: number): Promise<void> {
  try {
    await prisma.usuarios.delete({ where: { id } });
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar el usuario');
  }
}
