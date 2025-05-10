import { PrismaClient } from '@prisma/client';
import { AssetInput } from '../types';

const prisma = new PrismaClient();

export async function getAssetsByUser(userId: number) {
  return prisma.asset.findMany({ where: { userId } });
}

export async function createAssetForUser(userId: number, data: AssetInput) {
  return prisma.asset.create({
    data: {
      ...data,
      userId,
    },
  });
} 