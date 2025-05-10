import { Response } from 'express';
import { getAssetsByUser, createAssetForUser } from '../services/assetService';
import { AuthRequest } from '../middleware/auth';
import { z } from 'zod';
import { assetInputSchema } from '../validation';

export async function getAssets(req: AuthRequest, res: Response) {
  try {
    const userId = req.user!.id;
    const assets = await getAssetsByUser(userId);
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assets' });
  }
}

export async function createAsset(req: AuthRequest, res: Response) {
  try {
    const parseResult = assetInputSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ message: 'Validation error', errors: parseResult.error.errors });
    }
    const userId = req.user!.id;
    const asset = await createAssetForUser(userId, parseResult.data);
    res.status(201).json(asset);
  } catch (error) {
    res.status(500).json({ message: 'Error creating asset' });
  }
} 