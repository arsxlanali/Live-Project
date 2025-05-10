import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../services/userService';
import { userInputSchema } from '../validation';

export async function signup(req: Request, res: Response) {
  try {
    const parseResult = userInputSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ message: 'Validation error', errors: parseResult.error.errors });
    }
    const {
      email,
      password,
      name,
      location,
      address,
      dateOfBirth,
      gender,
      photo,
      facebook,
      twitter
    } = parseResult.data;

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await createUser({
      email,
      password: hashedPassword,
      name,
      location,
      address,
      dateOfBirth,
      gender,
      photo,
      facebook,
      twitter
    });

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        location: user.location,
        address: user.address,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        photo: user.photo,
        facebook: user.facebook,
        twitter: user.twitter
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        location: user.location,
        address: user.address,
        dateOfBirth: user.dateOfBirth,
        gender: user.gender,
        photo: user.photo,
        facebook: user.facebook,
        twitter: user.twitter
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
} 