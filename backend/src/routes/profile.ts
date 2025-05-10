import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { updateProfile, getProfileById } from '../controllers/profileController';

const router = Router();

// Update user profile
router.put('/profile', authMiddleware, updateProfile);

// Get user profile by id
router.get('/profile/:id', getProfileById);

export const profileRouter = router; 