import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }).min(1, 'Name is required'),

  email: z.string({
    required_error: 'Email is required',
  }).email('Invalid email address'),

  password: z.string({
    required_error: 'Password is required',
  }).min(6, 'Password must be at least 6 characters'),

  role: z.enum(['ADMIN', 'TRAINER', 'TRAINEE'], {
    required_error: 'Role is required and must be ADMIN, TRAINER or TRAINEE',
  }).optional(),
  profilePhoto: z.string().optional(),
  userStatus: z.enum(['active', 'inactive']).optional(),

  createdAt: z.union([z.string(), z.date()]).optional(),
});

export const UserValidation = {
  userValidationSchema,
};
