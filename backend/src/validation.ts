import { z } from 'zod';

export const userInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  location: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  photo: z.string().url().optional(),
  facebook: z.string().url().optional(),
  twitter: z.string().url().optional(),
});

export const assetInputSchema = z.object({
  model: z.string(),
  year: z.string(),
  fuelUsage: z.string().optional(),
  driver: z.string().optional(),
  price: z.string().optional(),
  topSpeed: z.string(),
  image: z.string().url(),
});

export const profileUpdateSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  location: z.string().optional(),
  address: z.string().optional(),
  dateOfBirth: z.string().optional(),
  gender: z.string().optional(),
  photo: z.string().url().optional(),
  facebook: z.string().url().optional(),
  twitter: z.string().url().optional(),
});