import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { getAssets, createAsset } from '../controllers/assetController';

const router = Router();

// Get all assets (cars) for the logged-in user
router.get('/assets', authMiddleware, getAssets);

// Create a new asset (car)
router.post('/assets', authMiddleware, createAsset);

export const assetRouter = router; 