import { NotFoundError } from '../errors/NotFoundError.ts';
import type { CreateUsuarioData, UsuarioData } from '../interfaces/Usuario.interface.ts';
import { prisma } from '../lib/prisma.ts';

export async function createUsuario(data: CreateUsuarioData): Promise<UsuarioData> {
  return await prisma.usuarios.create({ data });
}

export async function findUsuarioById(id: number): Promise<UsuarioData> {
  const usuario = await prisma.usuarios.findUnique({ where: { id } });
  if (!usuario) throw new NotFoundError('Usuario no encontrado');
  return usuario;
}

export async function findAllUsuarios(): Promise<UsuarioData[]> {
  return await prisma.usuarios.findMany();
}

export async function updateUsuario(id: number, data: Partial<UsuarioData>): Promise<UsuarioData> {
  return await prisma.usuarios.update({ where: { id }, data });
}

export async function deleteUsuarioService(id: number): Promise<void> {
  await prisma.usuarios.delete({ where: { id } });
}
