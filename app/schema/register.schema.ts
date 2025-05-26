import { z } from 'zod/v4'

export const Register = z.object({
  username: z.string().min(1),
  email: z.email(),
  password: z.string().min(8),
})
