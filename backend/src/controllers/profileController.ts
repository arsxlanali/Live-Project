import { Response, Request } from 'express';
import { findUserByEmailExcludeId, updateUser, findUserById } from '../services/userService';
import { AuthRequest } from '../middleware/auth';
import { profileUpdateSchema } from '../validation';

export async function updateProfile(req: AuthRequest, res: Response) {
  try {
    const parseResult = profileUpdateSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ message: 'Validation error', errors: parseResult.error.errors });
    }
    const userId = req.user!.id;
    const { name, email, location, address, dateOfBirth, gender, photo, facebook, twitter } = parseResult.data;

    // Check if email is already taken by another user
    if (email) {
      const existingUser = await findUserByEmailExcludeId(email, userId);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    const updatedUser = await updateUser(userId, {
      name,
      email,
      location,
      address,
      dateOfBirth,
      gender,
      photo,
      facebook,
      twitter,
    });

    res.json({
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      location: updatedUser.location,
      address: updatedUser.address,
      dateOfBirth: updatedUser.dateOfBirth,
      gender: updatedUser.gender,
      photo: updatedUser.photo,
      facebook: updatedUser.facebook,
      twitter: updatedUser.twitter,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
}

export async function getProfileById(req: Request, res: Response) {
  try {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }
    const user = await findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      location: user.location,
      address: user.address,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      photo: user.photo,
      facebook: user.facebook,
      twitter: user.twitter,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
} 