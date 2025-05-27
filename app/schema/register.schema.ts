import { z } from 'zod/v4'

export const Register = z.object({
  username: z.string().min(1, { error: "Username can't empty" }),
  email: z.email("Input isn't an email or empty"),
  password: z
    .string()
    .min(8, { error: 'Password must have a minimum of 8 characters' }),
})
