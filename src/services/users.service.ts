import { NotFoundError } from '../errors/NotFoundError.ts';
import type { CreateUserData, UserData } from '../interfaces/User.interface.ts';
import { prisma } from '../lib/prisma.ts';

export async function createUser(data: CreateUserData): Promise<UserData> {
  return await prisma.users.create({ data });
}

export async function findUserById(id: number): Promise<UserData> {
  const user = await prisma.users.findUnique({ where: { id } });
  if (!user) throw new NotFoundError('Usuario no encontrado');

  return user;
}

export async function findAllUsers(): Promise<UserData[]> {
  return await prisma.users.findMany();
}

export async function updateUser(id: number, data: Partial<UserData>): Promise<UserData> {
  const user: UserData | null = await prisma.users.findUnique({ where: { id } });
  if (!user) throw new NotFoundError('Usuario no encontrado');
  return await prisma.users.update({ where: { id }, data });
}

export async function deleteUserService(id: number): Promise<void> {
  const user: UserData | null = await prisma.users.findUnique({ where: { id } });
  if (!user) throw new NotFoundError('Usuario no encontrado');
  await prisma.users.delete({ where: { id } });
}
