import { PrismaClient } from '@prisma/client';
import { UserInput } from '../types';

const prisma = new PrismaClient();

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserByEmailExcludeId(email: string, excludeId: number) {
  return prisma.user.findFirst({
    where: {
      email,
      id: { not: excludeId },
    },
  });
}

export async function findUserById(id: number) {
  return prisma.user.findUnique({ where: { id } });
}

export async function createUser(data: UserInput) {
  return prisma.user.create({ data });
}

export async function updateUser(userId: number, data: Partial<UserInput>) {
  return prisma.user.update({ where: { id: userId }, data });
} 